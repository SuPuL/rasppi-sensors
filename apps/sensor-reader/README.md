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
$ @supul/rasppi-sensor-reader COMMAND
running command...
$ @supul/rasppi-sensor-reader (--version)
@supul/rasppi-sensor-reader/0.0.0 darwin-arm64 node-v17.3.0
$ @supul/rasppi-sensor-reader --help [COMMAND]
USAGE
  $ @supul/rasppi-sensor-reader COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`@supul/rasppi-sensor-reader help [COMMAND]`](#supulrasppi-sensor-reader-help-command)
* [`@supul/rasppi-sensor-reader plugins`](#supulrasppi-sensor-reader-plugins)
* [`@supul/rasppi-sensor-reader plugins:inspect PLUGIN...`](#supulrasppi-sensor-reader-pluginsinspect-plugin)
* [`@supul/rasppi-sensor-reader plugins:install PLUGIN...`](#supulrasppi-sensor-reader-pluginsinstall-plugin)
* [`@supul/rasppi-sensor-reader plugins:link PLUGIN`](#supulrasppi-sensor-reader-pluginslink-plugin)
* [`@supul/rasppi-sensor-reader plugins:uninstall PLUGIN...`](#supulrasppi-sensor-reader-pluginsuninstall-plugin)
* [`@supul/rasppi-sensor-reader plugins update`](#supulrasppi-sensor-reader-plugins-update)

## `@supul/rasppi-sensor-reader help [COMMAND]`

Display help for @supul/rasppi-sensor-reader.

```
USAGE
  $ @supul/rasppi-sensor-reader help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for @supul/rasppi-sensor-reader.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `@supul/rasppi-sensor-reader plugins`

List installed plugins.

```
USAGE
  $ @supul/rasppi-sensor-reader plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ @supul/rasppi-sensor-reader plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `@supul/rasppi-sensor-reader plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ @supul/rasppi-sensor-reader plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ @supul/rasppi-sensor-reader plugins:inspect myplugin
```

## `@supul/rasppi-sensor-reader plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ @supul/rasppi-sensor-reader plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ @supul/rasppi-sensor-reader plugins add

EXAMPLES
  $ @supul/rasppi-sensor-reader plugins:install myplugin 

  $ @supul/rasppi-sensor-reader plugins:install https://github.com/someuser/someplugin

  $ @supul/rasppi-sensor-reader plugins:install someuser/someplugin
```

## `@supul/rasppi-sensor-reader plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ @supul/rasppi-sensor-reader plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ @supul/rasppi-sensor-reader plugins:link myplugin
```

## `@supul/rasppi-sensor-reader plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ @supul/rasppi-sensor-reader plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ @supul/rasppi-sensor-reader plugins unlink
  $ @supul/rasppi-sensor-reader plugins remove
```

## `@supul/rasppi-sensor-reader plugins update`

Update installed plugins.

```
USAGE
  $ @supul/rasppi-sensor-reader plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
