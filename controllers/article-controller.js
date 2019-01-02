let express = require('express');
let router = express.Router();
let Article = require('../models').Article;

router.get('/', (req, res) => {
    Article.findAll().then(
        (articles) => {
            res.json(articles);
        }
    ).catch(err => {
        res.json(err);
    });
});

router.get('/:id', (req, res) => {
    Article.findByPk(req.params.id).then(
        (article) => {
            if (article) {
                res.json(article);
            } else {
                res.status(400).send();
            }
        }
    ).catch(err => {
        res.json(err);
    });
});

router.post('/', (req, res) => {
    Article.create({
        title: req.body.title,
        description: req.body.description
    }).then(
        (article) => {
            res.json(article);
        }
    ).catch(err => {
        res.json(err);
    });
});

router.delete('/:id', (req, res) => {
    Article.destroy({where:{ id: req.params.id }})
    .then(
        (article) => {
            res.json(article);
        }
    ).catch(err => {
        res.json(err);
    });
});

router.put('/:id', (req, res) => {
    if (req.params.id != req.body.id) {
        res.json(new Error('Erreur'));
    }
    Article.update({
            id: req.params.id,
            title: req.body.title,
            description: req.body.description
           }, { where: { id: req.params.id }
    }).then(
        (article) => {
            res.json(article);
        }
    ).catch(err => {
        res.json(err);
    });
});

module.exports = router;