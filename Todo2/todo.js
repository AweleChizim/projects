const express = require("express");
const mongoose = require("mongoose");
const Todo = require('./models/TodoModel');
const User = require('./models/UserModel');
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require('./middleware');
const dotenv = require("dotenv");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// todo-tasks actions
app.post('/todo', isAuth, async (req, res) => {
    const user = req.user
    try {
        const todo = await Todo.create({
            "item": req.body.item,
            "task": req.body.task,
            "user": user.id
        });

        res.status(200).json(todo);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: `error` });
    }
});

app.get('/todo', isAuth, async (req, res) => {
    try {
        isAuth;
        const user = req.user
        const todos = await Todo.
            find({ "user": user.id}).populate({ path: 'user', select: 'username email' });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: `error` });
    }
});

app.get('/todo/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const todo = await Todo.findOne({
            user: user.id,
            _id: id
        });
        if (!todo) {
            return res.status(404).json({ message: `cannot find any task with ID ${id}` })
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: `error` });
    }
});

app.put('/todo/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const todo = await Todo.findOneAndUpdate(
            {_id: id, user: user.id},
            {item: req.body.item, task: req.body.task}
        );
        if (!todo) {
            return res.status(404).json({ message: `cannot find any task with ID ${id}` })
        }
        const updatedTodo = await Todo.findById(id);
        res.status(200).json(updatedTodo);

    } catch (error) {
        res.status(500).json({ message: `error` });
    }
});

app.delete('/todo/:id', isAuth, async (req, res) => {
    try {
        isAuth;
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: `cannot find any task with ID ${id}` })
        }
        res.status(200).json({message: `Task Deleted`});

    } catch (error) {
        res.status(500).json({ message: `error` });
    }
});

////////////////////
// users
app.post('/create-user', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({message: "User created"});

    } catch (error) {
        console.log(error.message);
        res.status(404).json({ error: `User already exists!` });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'user not found' })
        };

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Incorrect email or password' })
        };

        const token = jwt.sign({ userId: user._id }, 'secretkey', {
            expiresIn: '1h',
        });

        res.json({ success: `Access Granted`, token })
    } catch (error) {
        res.status(500).json({ message: `error` });
    }
});

dotenv.config();

// connecting to db
mongoose.
    connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to DB');
        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    }).catch(() => {
        console.log(error);
    });



    // const test = async (username, password) => {
    //     const user = await User.findOne({email: email});
    //     const result = await user.comparePassword(password)
    //     if (result) {
    //         console.log('Access granted')
    //     } else {
    //         console.log('Incorrect password')
    //     }
    // };
    // try {
    //     const todo = await Todo.create(req.body);
    //     res.status(200).json(todo);
    // } catch (error) {
    //     console.log(error.message);
    //     res.status(500).json({message: error.message});
    // }