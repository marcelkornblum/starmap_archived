MANAGE=python ./manage.py
PROJECT_NAME=ranger
PROJECT_PATH=./$(PROJECT_NAME)
SETTINGS=--settings=$(PROJECT_PATH).settings.test

FLAKE8_OPTS=--exclude=.git,migrations --max-complexity=10

.PHONY: all test coverage clean requirements update \
	ensure_virtualenv reqs/dev reqs/test reqs/prod dev-setup

all: coverage

test:
	$(MANAGE) test --where=. $(SETTINGS) --with-xunit

coverage:
	$(MANAGE) test --where=. $(SETTINGS) \
		--with-xcoverage --with-xunit --cover-html  --cover-erase

clean:
	rm -rf .coverage cover nosetests.xml coverage.xml
	rm -rf $(PROJECT_PATH)/static/CACHE
	find . -name '*.pyc' -exec rm '{}' ';'

lint:
	flake8 $(FLAKE8_OPTS) .

ensure_virtualenv:
	@if [ -z $$VIRTUAL_ENV ]; then \
		echo "Please run me inside virtualenv.";  \
		exit 1; \
	fi

reqs/dev: ensure_virtualenv
	pip install -r requirements/base.txt
	pip install -r requirements/dev.txt

reqs/test: ensure_virtualenv
	pip install -r requirements/base.txt
	pip install -r requirements/test.txt

reqs/prod: ensure_virtualenv
	pip install -r requirements/base.txt
	pip install -r requirements/prod.txt

reqs-update:
	pip freeze --local | grep -v '^\-e' | cut -d = -f 1  | xargs pip install -U

dev-setup: ensure_virtualenv reqs/dev
	if [ ! -f $(PROJECT_PATH)/settings/local.py ]; then \
		echo 'from .dev import *' > $(PROJECT_PATH)/settings/local.py; \
	fi

test-setup: ensure_virtualenv reqs/test

dev-update: ensure_virtualenv reqs/dev
	$(MAKE) update

prod-update: ensure_virtualenv reqs/prod
	$(MAKE) update

update: ensure_virtualenv
	$(MAKE) clean
	$(MANAGE) syncdb
	$(MANAGE) migrate
	$(MANAGE) collectstatic --noinput