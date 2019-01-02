let express = require('express');
let bodyParser = require('body-parser');

let articles = require('./controllers/article-controller');


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/articles', articles);

app.use((req, res, next) => {
    let err = new Error('Not Found!');
    res.status = 404;
    res.send(err);
})


app.listen(8888);
console.log("server started");


module.exports = app;