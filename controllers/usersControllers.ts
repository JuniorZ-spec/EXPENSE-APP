import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/User'
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        // Hasher le password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Créer l'utilisateur
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })

    } catch (error) {
        console.error(`[AuthController] Register error:`, error)
        res.status(500).json({ message: "Internal server error" })
    }
}







export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Vérifier le password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Générer le JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        )

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })

    } catch (error) {
        console.error(`[AuthController] Login error:`, error)
        res.status(500).json({ message: "Internal server error" })
    }
}




export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ user })
    } catch (error) {
        console.error(`[AuthController] GetProfile error:`, error)
        res.status(500).json({ message: "Internal server error" })
    }
}