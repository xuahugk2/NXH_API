import bcrypt from 'bcrypt';
import userModel from '../models/user.js';
import { sendMail } from '../utils/sendMailUtil.js';

const controller = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(500).json({
                    message: 'Your login info is incorrect.',
                });
            }

            const checkPassword = bcrypt.compareSync(password, user.password);
            if (!checkPassword) {
                return res.status(503).json({
                    message: 'Your password is in correct.',
                });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                message: 'Login failed.',
            });
        }
    },
    register: async (req, res) => {
        try {
            const { email, password, firstName, lastName } = req.body;

            const user = await userModel.findOne({ email });

            if (user) {
                return res.status(503).json({
                    message: 'Email has been registered.',
                });
            }

            if (password.length < 8 || password.length > 64) {
                return res.status(503).json({
                    message: 'Password length must between 8 and 64 characters.',
                });
            }

            const hashPassword = bcrypt.hashSync(password, 10);

            const newUser = new userModel({ email, password: hashPassword, firstName, lastName });

            await newUser.save();

            return res.status(200).json(newUser);

        } catch (error) {
            return res.status(500).json({
                message: 'Register failed.',
            });
        }
    },
    forgotPwd: async (req, res) => {
        try {
            const { email } = req.body;

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(500).json({
                    message: 'Your email is not exists.',
                });
            }

            const { status, message } = await sendMail();

            return res.status(status).json({
                message,
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Reset password failed.',
            });
        }
    },
    getAllUser: async (req, res) => {
        try {
            const users = await userModel.find();

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({
                message: 'Get list of user failed.',
            });
        }
    }
};

export default controller;
