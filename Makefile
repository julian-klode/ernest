all: static/css/style.css

static/css/style.css:
	sassc -t compressed sass/style.sass  > static/css/style.css

.PHONY: static/css/style.css
