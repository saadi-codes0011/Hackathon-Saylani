const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../models/User');
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).send({
                message: "Please fill all the fields"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({
                message: "User already exists"
            })
        }
        const user = await User.create({ name, email, password: hashpassword })
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '30d',})
        if (user) {
            return res.status(200).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                token:token,
                message: "User created Successfully!"
            })
        }
    } catch (error) {
       res.status(500).json({
            message: error.message
        });
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({
                message: "Please fill all the fields"
            })
        }
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '30d',})

            return res.status(201).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                token:token,
                message: "Login Successfully!"
            })
        } else {
            res.status(401).json({
                message: "Invalid email or password"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
module.exports = { registerUser , loginUser }; 
