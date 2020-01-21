#!/bin/bash

ls -l ./sound-commands | grep -v 'total ' | awk '{print $9}' | awk -F "." '{print $1}' | sed 's/$/,/g'  | sed 's/^/!/g' | sed '$s/,//g' > ./commands/sound-commands.txt