
MAKEFLAGS += --no-print-directory

.EXPORT_ALL_VARIABLES:
.PHONY: all start prepare css js production html

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

all: NODE_ENV=true
start: NODE_ENV=false

all: prepare production html
	gzip --best --keep --no-name public/index.html

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
	tsc src/app.js --allowJs --lib DOM,ES2015 --target ES5 --outDir tmp
	esbuild tmp/app.js --bundle --sourcemap --define:STATIC=false --define:NODE_ENV=$(NODE_ENV) > public/app.js

html:
	esbuild src/index.js --bundle --define:STATIC=true --define:NODE_ENV=$(NODE_ENV) --platform=node | node > public/index.html

production:
	tsc src/app.js --allowJs --lib DOM,ES2015 --target ES5 --outDir tmp
	esbuild tmp/app.js --bundle --minify --define:STATIC=false --define:NODE_ENV=$(NODE_ENV) > public/app.min.js
	node-sass src/main.scss --quiet --include-path node_modules --output tmp
	cleancss -O2 tmp/main.css --output public/main.min.css
