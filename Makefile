
MAKEFLAGS += --no-print-directory

.EXPORT_ALL_VARIABLES:
.PHONY: all start prepare css js production html

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

all: NODE_ENV=true
start: NODE_ENV=false

all: prepare production html
	# gzip --best --keep --no-name public/index.html

clean:
	rm -rf node_modules public tmp && mkdir {public,tmp}
	rm -f package-lock.json

start: prepare
	node server --bang "$(MAKE) css js html" --scss "$(MAKE) css" --js "$(MAKE) js" --watch "src"

prepare:
	@echo ""
	rm -rf public tmp && mkdir {public,tmp}
	cp -r src/assets/* public
	@echo ""

css:
	node-sass src/main.scss --quiet --source-map-contents --include-path node_modules --source-map true --output public

js:
	esbuild src/app.js --bundle --sourcemap=external --define:NODE_ENV=$(NODE_ENV) --define:STATIC=false > public/app.bundle.js
	tsc public/app.bundle.js --allowJs --sourceMap --lib DOM,ES2015 --target ES5 --outFile public/app.js
	parcel-source-map --map public/app.bundle.js.map --map public/app.js.map --out public/app.js.map

html:
	esbuild src/index.js --bundle --define:STATIC=true --define:NODE_ENV=$(NODE_ENV) --platform=node | node > public/index.html

production:
	esbuild src/app.js --bundle --define:NODE_ENV=false --define:STATIC=false > tmp/app.bundle.js
	tsc tmp/app.bundle.js --allowJs --lib DOM,ES2015 --target ES5 --outFile tmp/app.bundle.es5.js
	uglifyjs tmp/app.bundle.es5.js --toplevel -m -c drop_console=true,passes=3 > public/app.min.js
	node-sass src/main.scss --quiet --include-path node_modules --output tmp
	cleancss -O2 tmp/main.css --output public/main.min.css
