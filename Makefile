all: static/webfonts assets/js/jquery.min.js static/css/style.css

node_modules/jquery/dist/jquery.min.js node_modules/@fortawesome/fontawesome-free/webfonts/ node_modules/sass/sass.js:
	npm install --no-optional --requirements

assets/js/jquery.min.js: node_modules/jquery/dist/jquery.min.js
	cp node_modules/jquery/dist/jquery.min.js assets/js/jquery.min.js

static/webfonts: node_modules/@fortawesome/fontawesome-free/webfonts/
	rm -rf static/webfonts
	cp -r node_modules/@fortawesome/fontawesome-free/webfonts/ static

static/css/style.css: node_modules/sass/sass.js
	node_modules/sass/sass.js sass/style.sass | ./node_modules/postcss-cli/index.js --config postcss.config.js > assets/css/main.css

.PHONY: static/css/style.css static/webfonts
