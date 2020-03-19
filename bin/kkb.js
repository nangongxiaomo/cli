#!/usr/bin/env node

const program = require('commander')
const VERSION = require('../package.json').VERSION
const {init} = require('../lib/init')

program.version(VERSION)

program
  .command('init <name>')
  .description('init project')
  .action(init)

program.parse(process.argv)
