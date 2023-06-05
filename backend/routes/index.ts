import express, { Router } from "express";
import User from "../model/user";
import jwt from "jsonwebtoken";
import { accessSecret, refreshSecret } from "../configs";
const route = express.Router()

route.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let ifUser = await User.findOne({ email: email })
        if (!ifUser) {
            const newUser = new User({
                name: name,
                email: email,
                password: password
            })
            await newUser.save();
            return res.json({
                'status': 'ok',
                'error': null,
                'msg': 'User Created'
            })
        } else {
            return res.json({
                'status': 'ok',
                'error': 'User Exist with Email'
            })
        }
    } catch (error) {
        return res.json({
            'status': 'error',
            'error': error
        })
    }
})


route.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let ifUser = await User.findOne({ email: email });
        if (ifUser && ifUser.password === password) {
            let accessToken = jwt.sign({ 'id': ifUser._id }, accessSecret, { expiresIn: '120s' })
            let refreshToken = jwt.sign({ 'id': ifUser._id }, refreshSecret, { expiresIn: '1d' })
            return res.json({
                'status': 'ok',
                'error': null,
                'accessToken': accessToken,
                'refreshToken': refreshToken
            })
        } else {
            return res.json({
                'status': 'ok',
                'error': null,
                'msg': 'User Doe not exists'
            })
        }
    } catch (error) {
        return res.json({
            'status': 'error',
            'error': error
        })
    }
})


route.post("/delete", async (req, res) => {
    let { accessToken } = req.body;
    interface JwtPayload {
        id: string;
    }
    try {
        let isValid = jwt.verify(accessToken, accessSecret) as JwtPayload;

    if (isValid) {
        let user = await User.findByIdAndDelete(isValid.id)
        if (user) {
            return res.json({
                'status': 'ok',
                'error': null,
                'msg': 'User Deleted Successfully'
            })
        } else {
            return res.json({
                'status': 'error',
                'msg': 'No user Found'
            })
        }
    } else {
        return res.json({
            'status': 'error',
            'error': 'Access Token is not valid'
        })
    }
    } catch (error) {
        res.json({
            'status':'error',
            'error':error
        })
    }
})

export default route;