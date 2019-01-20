let express = require('express');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');

let articles = require('./controllers/article-controller');
let authentication = require('./controllers/authentication-controller');


let app = express();

app.set('key', 'MY_KEY_FOR_CRYPTAGE');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/login', authentication);
app.use('/api/articles', validateUser, articles);

app.use((req, res, next) => {
    let err = new Error('Not Found!');
    res.status = 404;
    res.send(err);
})


app.listen(8888);
console.log("server started");


module.exports = app;

//validation de token
function validateUser(req, res, next) {
    var token = req.headers['authorization'].split(" ")[1] || req.headers['x-access-token'];
    jwt.verify(token, app.get('key'), (err, decoded) => {
        if (err) {
            res.status(403).json({status: 'Error', message: err.message});
        } else {
            console.log(`User avec l'id ${decoded.login}`);
            next();
        }
    })
}