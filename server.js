const express = require('express')
const app = express()
const port = process.env.PORT || 5000
var path = require('path');
app.use(express.static('public'))

var dbArray = require('./db/db.json')

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    // res.send('Hello World! her we goooooo!!!! asdfasdfasdfd')
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/notes', function (req, res) {
    console.log('We hit the /notes route!!')
    //res.send('notes file coming soon!!')
    res.sendFile(path.join(__dirname + '/public/notes.html'));
})

app.get('/api/notes', function (req, res) {
    console.log('We hit the /notes route!!')
    //res.send('notes file coming soon!!')
    //res.sendFile(path.join(__dirname + '/public/notes.html'));
    res.json(dbArray)
})

app.delete('/api/notes/:id', function (req, res) {
    console.log('We hit the delete route!!', req.params)

    // make an empty array to fill up with all the ppl we wat to keep

    //for loop thru our dbArray and do a if statement each time dbArray[i].id === req.params.id
    //if its a match we want to delete - don't add it to our empty array above
    //else if they don't match we ant to keep it! add it ot the empty array above

    var people = []
    for (let i = 0; i < dbArray.length; i++) {

        if (dbArray[i].id === parseInt(req.params.id)) {
            console.log('deleted', dbArray[i]);

        } else {
            console.log('we want to keep it', dbArray[i]);
            people.push(dbArray[i])
        }

    }

    console.log("this is our people to keep", people);
    dbArray = people




    //res.send('notes file coming soon!!')
    //res.sendFile(path.join(__dirname + '/public/notes.html'));
    res.json(dbArray)
})

app.post('/api/notes', function (req, res) {
    console.log('we hit the route!!!!!!', req.body)
    req.body.id = dbArray.length + 1
    console.log("dbArray", dbArray.length);
    dbArray.push(req.body)
    console.log('our dbarray after push', dbArray);
    //res.send('notes file coming soon!!')
    //res.sendFile(path.join(__dirname + '/public/notes.html'));
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
