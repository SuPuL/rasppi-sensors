oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @supul/rasppi-sensor-reader
$ rasppi-sensor-reader COMMAND
running command...
$ rasppi-sensor-reader (--version)
@supul/rasppi-sensor-reader/0.0.1 darwin-arm64 node-v16.11.1
$ rasppi-sensor-reader --help [COMMAND]
USAGE
  $ rasppi-sensor-reader COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rasppi-sensor-reader hello PERSON`](#rasppi-sensor-reader-hello-person)
* [`rasppi-sensor-reader hello:world`](#rasppi-sensor-reader-helloworld)
* [`rasppi-sensor-reader help [COMMAND]`](#rasppi-sensor-reader-help-command)

## `rasppi-sensor-reader hello PERSON`

Say hello

```
USAGE
  $ rasppi-sensor-reader hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

## `rasppi-sensor-reader hello:world`

Say hello world

```
USAGE
  $ rasppi-sensor-reader hello:world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `rasppi-sensor-reader help [COMMAND]`

Display help for rasppi-sensor-reader.

```
USAGE
  $ rasppi-sensor-reader help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for rasppi-sensor-reader.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_
<!-- commandsstop -->
