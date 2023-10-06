#!make

SHELL=/bin/bash

include make/commands.mk

.DEFAULT_GOAL := build

EXECUTABLES := ls node npm git

$(call check_executables,${EXECUTABLES})

# $(shell cp -n .env.default .env)
# include .env
# export
ENV_FILE_PARAM = --env-file .env

## Initialize the project
build:
	@echo "${LIGHTPURPLE}install package${RESET}";
	npm install
	@echo "${BLUE}DONE${RESET}";
	@echo "${LIGHTPURPLE}build apps${RESET}";
	npm run build:all
	@echo "${BLUE}DONE${RESET}";
.PHONY: build

init-dev:
	@echo "${LIGHTPURPLE}install precommit hook${RESET}";
	pre-commit install --hook-type commit-msg
	@echo "${LIGHTPURPLE}install package${RESET}";
	npm install
	@echo "${BLUE}DONE${RESET}";
	@echo "${LIGHTPURPLE}build apps${RESET}";
	npm run build:all
	@echo "${BLUE}DONE${RESET}";
.PHONY: build

## Initialize the project
show-config:
	$(call print_configuration)
.PHONY: show-config

clean:
	@echo "Cleaning up..."
.PHONY: clean


