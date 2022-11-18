const express = require('express');// Include ExpressJS
const bodyParser = require('body-parser');
const helper = require('./helper');//helper function
const path = require('path');
const app = express(); // Create an ExpressJS app
const { body, validationResult } = require('express-validator');
const port = 3000 // Port we will listen on

//parsing URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// setting the public folder
app.use(express.static(path.join(__dirname, 'public')));
//setting the template engine
app.set('view engine', 'ejs');

// Route to Homepage
app.get('/', (req, res) => {
    res.render(__dirname + '/views/index');
});

//Submit request
app.post(
    '/submit',
    body('number', 'Please enter a number between 1 to 100000').isInt({ min: 0, max: 100000 }),
    (req, res) => {

        //validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render(__dirname + '/views/index', { errors: errors.array() });
            return;
        }

        let number = req.body.number;
        let prime_numbers = [];
        let median_res = [];
        prime = Array.from({ length: number + 1 }, (_, i) => true);

        for (let p = 2; p * p <= number; p++) {
            // If prime[p] is not changed, then it is a prime
            if (prime[p] == true) {
                // Update all multiples of p
                for (i = p * p; i <= number; i += p)
                    prime[i] = false;
            }
        }

        // Print all prime numbers
        for (i = 2; i <= number; i++) {
            if (prime[i] == true) {
                prime_numbers.push(i);
            }
        }

        //get median numbers from the helper function
        median_res = helper.getMedian(prime_numbers);

        let data = {
            median: median_res,
            prime_numbers: prime_numbers
        }
        res.render(__dirname + '/views/index', { data: data });
    });

// any invalid request will send to notfound page
app.get('*', function (req, res) {
    res.render(__dirname + '/views/notfound');
});

app.listen(port, () => console.log(`This app is listening on port ${port}`));

module.exports = app;