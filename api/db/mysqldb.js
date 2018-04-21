var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'host',
    user: 'username',
    password: 'password',
    database: 'database',
    port: 3306
});



connection.connect(function(err) {
    if (err) {
        console.log(err);
    }

});

connection.query('SELECT * from USER_DETAILS', function(error, results, fields) {
    if (error) throw error;
    console.log(fields);
});


connection.end();