# usage:
# make test
# make test <path/to/test>
# make test unit
# make test integration
# make test style
#
# override default MOCHA_OPTS:
# make MOCHA_OPTS='-C -R dot' test

ENV_VARS=NODE_ENV=test PORT=9999
TEST_DIR=test/

MOCHA_BIN=mocha
MOCHA_DEFAULT_OPTS=test/bootstrap.test.js --recursive -t 30000
MOCHA_OPTS=-R spec

ifneq "$(wildcard ./node_modules/.bin/mocha)" ""
	MOCHA_BIN=./node_modules/.bin/mocha
endif

test:
	@$(eval TARGETS=$(filter-out $@,$(MAKECMDGOALS)))
	@$(eval TARGETS=$(TARGETS:test/%=%))
	@$(eval TARGETS=$(TARGETS:/%=%))
	@$(eval TARGETS=$(addprefix $(TEST_DIR),$(TARGETS)))
	@$(eval TARGET=$(shell [ -z $(firstword ${TARGETS}) ] && echo ${TEST_DIR}))
	@$(ENV_VARS) $(MOCHA_BIN) $(MOCHA_DEFAULT_OPTS) $(MOCHA_OPTS) $(TARGET) $(TARGETS)

clean:
	@echo 'deleting node_modules...'
	@\rm -Rf ./node_modules

silent:
	@:

%: silent
	@:

.PHONY: check clean silent test check-styles
