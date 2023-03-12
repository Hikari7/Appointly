const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const salt = Number(process.env.SALT)
const jwtSecret = process.env.JWT_SECRET
const User = require('../models/User')

exports.signUp = async (username, email, password) => {
    try {
        let user = await User.findOne({ email })

        // Check user existing
        if(user){
            return {errorMessage: "Email already exists."};
        }
        
        // Create new user
        user = new User({username, email, password})
        await user.save()
        const token = JWT.sign({ id: user._id }, jwtSecret, {expiresIn: "1d" })        

        return( data = {
            userId: user._id,
            username: user.username,
            token
        })
        
    } catch (error) {
        return {errorMessage: "Something went wrong. Please try again."};
    }

}

exports.login = async (email, password) => {
    try {
        let user = await User.findOne({ email }).lean()
    
        // Check user existing
        if(!user){
            return {errorMessage: "User does not exists."};
        }

        const isValid = await bcrypt.compare(password, user.password)
        
        if(isValid){          
            const token = JWT.sign({ id: user._id}, jwtSecret, { expiresIn: '1d' })

            return (data = {
                userId: user._id,
                username: user.username,
                token
            })
    
        }else{
            return {errorMessage: "Incorrect credentials."};
        }
        
    } catch (error) {
        return {errorMessage: "Something went wrong. Please try again."};
    }
}


