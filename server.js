var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(path.join(__dirname, '../client')));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});