#! /usr/bin/env node

'use strict';

var child_process = require('child_process');
var electron = require('electron-prebuilt');
var join = require('path').join;
const startPath = join(__dirname, '..');
child_process.spawn(electron, [startPath]);
