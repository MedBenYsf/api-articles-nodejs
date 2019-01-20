let express = require('express');
let jwt = require('jsonwebtoken');
let md5 = require('md5');
let User = require('../models').User;

let router = express.Router();

router.post('/', (req, res) => {
    let login = req.body.login;
    let password = md5(req.body.password);
    User.findOne({where: {email: login, password: password}}).then(
        (data) => {
            if (data) {
                let token = jwt.sign({id: data.id, login: data.email}, req.app.get('key'), {expiresIn: 1440});
                res.json({
                    success: true, message: 'Login ok', token: token
                });
            } else {
                res.status(400).json({
                    success: false, message: 'Login/password invalide!'
                });
            }
        }
    )
});

module.exports = router;