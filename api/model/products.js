var products = {

    getPoduct: function(req, res) {
        var products = availableproducts();
        res.status(200).json(products).end();
    },

    addProduct: function(req, res) {
        var products = availableproducts();
        products.push(req.body);
        res.status(200).json(products).end();
    },

    deleteProducts: function(req, res) {
        var products = availableproducts();
        var productAfterDelete = [];
        products.forEach(function(ele) {
            if (ele.id == req.body.id) {

            } else {
                productAfterDelete.push(ele);
            }
        })
        res.status(200).json(productAfterDelete).end();
    }


}



var availableproducts = function() {
    return [{
        'id': 1,
        'Name': 'Cards',
        'Type': 'Debit'
    }, {
        'id': 2,
        'Name': 'Cards',
        'Type': 'Credit'
    }, {
        'id': 3,
        'Name': 'Cash',
        'Type': 'Cash'
    }]
};

module.exports = products;;