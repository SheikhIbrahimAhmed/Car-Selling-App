const User = require("../models/userModel");
const { findSingleUserServ } = require("../services/authService");
const { hashPassword } = require("../utils/util");

const SECRET_KEY = "12qw";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const createUser = async (req, res) => {
//     try {
//         const { name, email, password, profileImage } = req.body;
//         if (!name || !email || !password || !profileImage) {
//             return res.status(400).json({ message: 'Name, email , password and imageFile are required.' });
//         }
//         const user = await findSingleUserServ({ email })

//         if (user) {
//             return res.status(409).json({ message: 'Email already exist.' });
//         }

//         const hashedPassword = await hashPassword(password);
//         const newUser = await createUserServ({
//             name,
//             email,
//             password: hashedPassword,
//             profileImage: profileImage
//         })

//         newUser.password = ""
//         res.status(200).json({
//             message: 'User created successfully!',
//             user: newUser,
//         });

//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ message: 'Error creating user.', error: error.message });
//     }
// }

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findSingleUserServ({ email })

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            SECRET_KEY,
            { expiresIn: "7d" }
        );
        user.password = ""
        res.status(200).json({ message: "Login successful!", token, user });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    // createUser,
    loginUser
}


