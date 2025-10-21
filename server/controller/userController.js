import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



// ------------------------------------------------------------- Register --------------------------------------------------------
export const register = async (req, res) => {

    
    
    
    try {

        const { fullname, email, password } = req.body
 
        if (!fullname || !email || !password) {
            return res.status(403).json({success:false , message:"Missing Details"})
        }

        const existingEmail = await User.findOne({email})
        if (existingEmail) {
            return res.status(403).json({success:false , message:"User already exist with this email"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({ email, fullname, password: hashPassword })


        
        return res.status(201).json({success:true , message:"User registration successfully"})

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server error" })
        console.log(error);
        
    }
}



// ------------------------------------------------------------- Login --------------------------------------------------------
export const login = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
           return res.status(403).json({success:false , message:"Missing Details"})
        }

        const user = await User.findOne({ email })

        if (!user) {
           return res.status(403).json({success:false , message:"Incorrect email or password"})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        
        if (!isPasswordMatch) {
            return res.status(403).json({success:false , message:"Incorrect Password"})
        }

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        

        return res.status(201).cookie('token' , token , {HttpOnly:true , sameSite:"strict" , maxAge:24*60*60*1000}).json({success:true , message:"User login successfully"})
    
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" })
        console.log(error);
    }
}


export const logOut = async (req, res) => {
    try {

        return res.status(200).cookie('token' , "" , {maxAge:0}).json({ success: true, message: "Logout Successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" })
        console.log(error);
    }
}