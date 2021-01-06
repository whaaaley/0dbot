
MAKEFLAGS += --no-print-directory

.EXPORT_ALL_VARIABLES:
.PHONY: all start prepare css js build html

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

all: DEV=false
start: DEV=true

all: prepare build html
	# gzip --best --keep --no-name public/index.html

clean:
	rm -rf node_modules public tmp && mkdir {public,tmp}
	rm -f package-lock.json

start: prepare
	node server --bang "$(MAKE) css js html" --scss "$(MAKE) css" --ts "$(MAKE) js" --watch "src"

prepare:
	@echo ""
	rm -rf public tmp && mkdir {public,tmp}
	cp -r src/assets/* public
	@echo ""

css:
	sass src/main.scss public/main.css --embed-sources --no-error-css --load-path node_modules | tee

js:
	esbuild src/app.ts --bundle --sourcemap=external --define:DEV=true --define:STATIC=false --outfile=public/app.js | tee
	tsc src/app.ts --noEmit --noImplicitAny true --lib DOM | tee

html:
	esbuild src/index.ts --bundle --define:DEV=$(DEV) --define:STATIC=true --platform=node | node > public/index.html

build:
	esbuild src/app.js --bundle --minify --define:DEV=false --define:STATIC=false > tmp/app.bundle.js
	tsc tmp/app.bundle.js --allowJs --lib DOM,ES2015 --target ES5 --outFile tmp/app.bundle.es5.js
	uglifyjs tmp/app.bundle.es5.js --toplevel -m -c drop_console=true,passes=3 > public/app.min.js
	node-sass src/main.scss --quiet --include-path node_modules --output tmp
	cleancss -O2 tmp/main.css --output public/main.min.css
