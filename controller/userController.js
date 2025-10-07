import { User } from "../models/user.js"
import bcrypt from 'bcrypt'



// ------------------------------------------------------------- Register --------------------------------------------------------
export const register = async (req, res) => {

    
    
    
    try {

        const { fullname, email, password } = req.body
        
        if (!fullname || !email || !password) {
            res.status(403).json({success:false , message:"Missing Details"})
        }

        const existingEmail = await User.findOne({email})
        if (existingEmail) {
            res.status(403).json({success:false , message:"User already exist with this email"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({ email, fullname, password: hashPassword })
        
        res.status(201).json({success:true , message:"User registration successfully"})

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server error" })
        console.log(error);
        
    }
}



// ------------------------------------------------------------- Login --------------------------------------------------------
export const login = async (req, res) => {
    
    console.log("----------------req" , req); 

    try {

        const { email, password } = req.body

        if (!email || !password) {
            res.status(403).json({success:false , message:"Missing Details"})
        }

        const user = await User.findOne({ email })

        if (!user) {
            res.status(403).json({success:false , message:"Incorrect email or password"})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        
        if (!isPasswordMatch) {
            res.status(403).json({success:false , message:"Incorrect Password"})
        }

        res.status(201).json({success:true , message:"User login successfully"})
    
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server error" })
        console.log(error);
    }
}