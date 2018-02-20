var express = require('express');
var router = express.Router();
var pool = require(__dirname + '/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Express RESTful API');
});


router.get('/news', function(req, res, next) {
    var value = req.query.value;
    var field = req.query.field;

    console.log('value', value);
    console.log('field', field);

    pool.connect(function(db) {
        if (db) {
            console.log('connected');
            news = db.collection('news');

            switch (field) {
                case "no":
                    var query = { "no": { $regex: '.*' + value + '.*', $options: 'i' } };
                    break;
                case "author":
                    var query = { author: { $regex: '.*' + value + '.*', $options: 'i' } };
                    break;
                case "date":
                    var query = { date: new Date(value) }
                    break;
                case "title":
                    var query = { title: { $regex: '.*' + value + '.*', $options: 'i' } }
                    break;
                    // case "tags_title":
                    //     var query = { tags_title: value }
                    //     break;
                default:
                    break;
            }

            console.log('query', query);
            if (value == "false" && field == "false") {
                news.find().sort({ "date": -1 }).limit(20).toArray(
                    function(err, data) {
                        if (!err) {
                            console.log('total', data.length);
                            res.send({ items: data });
                            return;
                        } else {
                            console.log('Errr', err);
                            return;
                        }
                    });
            } else {
                news.find(query).limit(30).toArray(
                    function(err, data) {
                        if (!err) {
                            console.log('total', data.length);
                            res.send({ items: data });
                            return;
                        } else {
                            console.log('Errr', err);
                            return;
                        }
                    });
            }
        } else {
            console.log('Connection error');
        }
    });
})


router.get('/latestNews', function(req, res, next) {
    pool.connect(function(db) {
        if (db) {
            console.log('connected');
            news = db.collection('news');
            news.find().sort({ "date": -1 }).limit(20).toArray(
                function(err, data) {
                    if (!err) {
                        console.log('total', data.length);
                        res.send(data);
                        return;
                    } else {
                        console.log('Errr', err);
                        return;
                    }
                });
        } else {
            console.log('Connection error');
        }
    });
});

router.get('/users', function(req, res, next) {
    var data = [{
            name: 'bhavesh'
        },
        {
            name: 'alex patel'
        }
    ];
    res.send(data);
    return;
});



module.exports = router;