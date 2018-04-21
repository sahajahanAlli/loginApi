var jwt = require('jwt-simple')

var auth = {
    login: function(req, res, next) {

        if (req.body.username && req.body.password) {
            var user = validateUser(req.body.username, req.body.password);
            console.log(user);
            if (user == null) {
                res.status(401);
                res.json({ 'code': 401, 'Message': 'Unauthorized', 'description': 'Username or password incorrect' }).end();
            }
            var token = getToken(user);
            res.status(201).json({ 'code': 201, 'Token': token }).end();

        } else {
            res.status(401);
            res.json({ 'code': 401, 'Message': 'Unauthorized', 'description': 'Username or password incorrect' }).end();
        }
    },

    validateHeader: function(req, res, next) {

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

        //check for mandatory headers
        req_headers = req.headers;
        console.log(typeof req_headers['x-key'] == "undefined");
        if (typeof req_headers['x-key'] != "undefined") {
            if (req_headers['x-key'] === 'TryAPI') {
                if (req.method == 'OPTIONS') {
                    res.status(200);
                    res.json({ 'code': 200, 'Message': 'Please see the header Informations' }).end();
                } else {
                    next();
                }
            } else {
                res.status(400);
                res.json({ 'code': 400, 'Message': 'Invalid Request', 'description': 'Incorrect value in the Header' }).end();
            }
        } else {
            res.status(400);
            res.json({ 'code': 400, 'Message': 'Invalid Request', 'description': 'Header is missing' }).end();
        }

    },
    validateToken: function(req, res, next) {
        var req_headers = req.headers;
        var payload = {};
        if (typeof req_headers['x-access-token'] != "undefined") {
            var token = req_headers['x-access-token'];
            console.log(token);
            try {
                payload = jwt.decode(token, require('./config/config').IdentityKey());
            } catch (err) {
                res.status(401);
                res.json({ 'code': 401, 'Message': 'Unauthorized', 'description': 'Invalid access token' }).end();
            }
            if (payload.expiry > Date.now()) {
                next();
            } else {
                res.status(401);
                res.json({ 'code': 401, 'Message': 'Unauthorized', 'description': 'Invalid access token' }).end();
            }

        } else {
            res.status(401);
            res.json({ 'code': 401, 'Message': 'Unauthorized', 'description': 'Invalid access token' }).end();

        }

    }
}

var validateUser = function(username, password) {

    var UserData = require('../api/model/user.model').listOfUser();
    console.log(UserData);
    for (user in UserData) {
        if (UserData[user].Username == username && UserData[user].Password == password) {
            return UserData[user];
        } else {
            return;
        }
    }
}

var getToken = function(user) {
    var payload = user;
    payload.expiry = expiryTime(2);
    var token = jwt.encode(payload, require('./config/config').IdentityKey());
    return token;
}

var expiryTime = function(timeinmin) {
    var date = Date.now();
    return date + timeinmin * 60 * 1000;
}

module.exports = auth;