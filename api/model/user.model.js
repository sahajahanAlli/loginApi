var user = {

    listOfUser: function() {

        var UserData = [{
            'userid': 1,
            'Username': 'Mark',
            'Password': 'Password01',
            'Place': 'London'
        }, {
            'userid': 2,
            'Username': 'John',
            'Password': 'Password01',
            'Place': 'Wales'
        }]

        return UserData;
    },


    addUser: function(req, res) {
        var userdata = req.body;

        userdata.userid = 3;
        console.log(userdata);
        var listuser = user.listOfUser();
        console.log(listuser.push(userdata));
        res.status(200).json(listuser).end();

    }
}

module.exports = user;