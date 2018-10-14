all: static/css/style.css

static/css/style.css:
	npm install --no-optional --requirements
	node_modules/sass/sass.js sass/style.sass | ./node_modules/postcss-cli/bin/postcss --config postcss.config.js > assets/css/main.css

.PHONY: static/css/style.css
