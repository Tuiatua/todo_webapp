const {sequelize} = require("../models");
const {QueryTypes} = require("sequelize");
const {Todo} = require('../models/index')

module.exports.homeroute =  async function (req, res, next) {
    let toDoItems = await Todo.findALL();
    res.render('index', {toDoItems});
};

module.exports.renderAddForm = function (req, res, next) {
    res.render('create_todo')
}

module.exports.addNewItem = async function (req, res, next) {
    await Todo.create({
        description: req.body.description
    });
    res.redirect('/');
};

module.exports.markItemComplete = async function (req, res, next) {
    await Todo.update({ completed: true}, {
        where: {
            id: req.params.id
        }
    });
    res.redirect('/');
};

module.exports.markItemAsIncomplete = async function (req, res, next) {
    await Todo.update({ completed: false}, {
        where: {
            id: req.params.id
        }
    });
    res.redirect('/');
};

module.exports.deleteItem = async function (req, res, next) {
    await Todo.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/');
};

module.exports.renderEditForm = async function (req, res, next) {
    let todo = await Todo.FindByPk(req.params.id);
    res.render('edit_form', {
        item: {
            description: req.body.description,
            id: todo.id
        }
    })
};

module.exports.updateItem = async function (req, res, next) {
    await Todo.update({description: req.body.description}, {
        where: {
            id: req.params.id
        }
    });
    res.redirect('/');
};