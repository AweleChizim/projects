const express = require("express");
const router = express.Router();
const isAuth = require('./middleware');
const Todo = require('./models/TodoModel');


// router.get('/home', (req, res) => {
//     res.send("Welcome to Todo App");
// });




router.route('/')
    .post(addtodo)
    .get(getalltodos)

router.route('/:id')
    .put(updatetodo)
    .delete(deletetodo)
    .get(gettodo)


module.exports = router;