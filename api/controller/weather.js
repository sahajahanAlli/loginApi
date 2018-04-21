var request = require('request-promise');

var Getweather = {
    getWeatherFun: function(req, res) {
        request.get({
            uri: 'http://api.openweathermap.org/data/2.5/forecast',
            qs: {
                'id': req.query.id,
                'appid': req.query.appid
            },
            json: true
        }).then(function(result) {
            res.status(200).json(result).end();
        }).catch(function(error) {
            res.status(400).json({ 'code': 400, 'Message': 'Invalid Request', 'description': 'Invalid id provided' }).end();
        })
    }
}

module.exports = Getweather;