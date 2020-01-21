#!/bin/bash
#
# WIP
#
# Think how to remove sound commands
# Maybe delete lines after a match or compare 2 files and delete matches

grep 'case' index.js | sed "s/.*case '//g" | sed "s/'://g"