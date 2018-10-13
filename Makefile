all: static/css/style.css

static/css/style.css:
	sassc sass/style.sass  > assets/css/main.css

.PHONY: static/css/style.css
