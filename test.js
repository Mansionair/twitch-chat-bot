var fs = require('fs');
 
fs.readFile('my-text.txt', 'utf8', function(err, contents) {
    console.log(contents);
});
 