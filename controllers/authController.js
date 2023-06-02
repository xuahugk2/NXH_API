import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

const controller = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(500).json({
                    message: 'Your login info is incorrect.',
                    data: undefined,
                });
            }

            if (user.role !== 1) {
                return res.status(503).json({
                    message: 'Your do not have authority to access.',
                    data: undefined,
                });
            }

            const checkPassword = bcrypt.compareSync(password, user.password);
            if (!checkPassword) {
                return res.status(503).json({
                    message: 'Your password is in correct.',
                    data: undefined,
                });
            }

            return res.status(200).json({
                message: undefined,
                data: user,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Login failed.',
                data: undefined,
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
                    data: undefined,
                });
            }

            if (password.length < 8 || password.length > 64) {
                return res.status(503).json({
                    message: 'Password length must between 8 and 64 characters.',
                    data: undefined,
                });
            }

            const hashPassword = bcrypt.hashSync(password, 10);

            const newUser = new userModel({ email, password: hashPassword, firstName, lastName });

            await newUser.save();

            return res.status(200).json({
                message: undefined,
                data: newUser,
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Register failed.',
                data: undefined,
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
                    data: undefined,
                });
            }

            const { status, message } = await sendMail();

            return res.status(status).json({
                message,
                data: undefined,
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Reset password failed.',
                data: undefined,
            });
        }
    },
};

export default controller;
