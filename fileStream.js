var fs = require('fs');

fs.readFile('file.txt', function (error, data) {
    if (error) {
        throw error;
    }
    console.log(data.toString());
});

// module.exports fs;