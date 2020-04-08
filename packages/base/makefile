LINT = $(PWD)/node_modules/.bin/eslint
JEST = $(PWD)/node_modules/.bin/jest
BABEL = $(PWD)/node_modules/.bin/babel
FORMATTER = $(shell node -p "require.resolve('eslint-friendly-formatter')")

DIR ?= src

install:
	NODE_ENV=development yarn install

build:
	NODE_ENV=production $(BABEL) src -d . --copy-files

watch:
	$(BABEL) -w src -d lib --copy-files

lint:
	$(LINT) --format $(FORMATTER) --fix src/*.js

test: lint
	$(JEST) --env=node --coverage --runInBand $(DIR)

dev:
	$(JEST) -o --watch --runInBand --forceExit $(DIR)

debug:
	node --inspect-brk=0.0.0.0:9230 $(JEST) -o --watch --runInBand --forceExit $(DIR)

publish: build
	npm publish

.PHONY: test lint dev build watch publish install
