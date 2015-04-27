var express = require('express');
var router = express.Router();

var data = [
    {
        "payment_date": Date.parse("2014-04-26 12:00 GMT+1000"),
        "phone_model": "Phone 1",
        "payment_status": "SUCCESS",
        "turnaround_time": 123456
    },
    {
        "payment_date": Date.parse("2015-03-26 12:00 GMT+1000"),
        "phone_model": "Phone 1",
        "payment_status": "FAIL",
        "turnaround_time": 234567
    },
    {
        "payment_date": Date.parse("2015-02-26 12:00 GMT+1000"),
        "phone_model": "Phone 2",
        "payment_status": "SUCCESS",
        "turnaround_time": 345678
    },
    {
        "payment_date": Date.parse("2015-01-26 12:00 GMT+1000"),
        "phone_model": "Phone 2",
        "payment_status": "FAIL",
        "turnaround_time": 123456
    },
	{
        "payment_date": Date.parse("2014-04-26 12:00 GMT+1000"),
        "phone_model": "Phone 3",
        "payment_status": "SUCCESS",
        "turnaround_time": 234567
    },
    {
        "payment_date": Date.parse("2015-03-26 12:00 GMT+1000"),
        "phone_model": "Phone 3",
        "payment_status": "FAIL",
        "turnaround_time": 345678
    },
    {
        "payment_date": Date.parse("2015-02-26 12:00 GMT+1000"),
        "phone_model": "Phone 4",
        "payment_status": "SUCCESS",
        "turnaround_time": 123456
    },
    {
        "payment_date": Date.parse("2015-01-26 12:00 GMT+1000"),
        "phone_model": "Phone 4",
        "payment_status": "FAIL",
        "turnaround_time": 234567
    },
    {
        "payment_date": Date.parse("2014-12-26 12:00 GMT+1000"),
        "phone_model": "Phone 1",
        "payment_status": "SUCCESS",
        "turnaround_time": 345678
    },
    {
        "payment_date": Date.parse("2014-11-26 12:00 GMT+1000"),
        "phone_model": "Phone 1",
        "payment_status": "FAIL",
        "turnaround_time": 123456
    },
    {
        "payment_date": Date.parse("2014-10-26 12:00 GMT+1000"),
        "phone_model": "Phone 2",
        "payment_status": "SUCCESS",
        "turnaround_time": 234567
    },
    {
        "payment_date": Date.parse("2014-09-26 12:00 GMT+1000"),
        "phone_model": "Phone 2",
        "payment_status": "FAIL",
        "turnaround_time": 345678
    },
    {
        "payment_date": Date.parse("2014-08-26 12:00 GMT+1000"),
        "phone_model": "Phone 3",
        "payment_status": "SUCCESS",
        "turnaround_time": 123456
    },
    {
        "payment_date": Date.parse("2014-07-26 12:00 GMT+1000"),
        "phone_model": "Phone 3",
        "payment_status": "FAIL",
        "turnaround_time": 234567
    },
    {
        "payment_date": Date.parse("2014-06-26 12:00 GMT+1000"),
        "phone_model": "Phone 4",
        "payment_status": "SUCCESS",
        "turnaround_time": 345678
    },
    {
        "payment_date": Date.parse("2014-05-26 12:00 GMT+1000"),
        "phone_model": "Phone 4",
        "payment_status": "FAIL",
        "turnaround_time": 123456
    }
];

/* GET users listing. */
router.get('/payments', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
});

module.exports = router;
