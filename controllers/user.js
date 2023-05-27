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
                    data: undefined,
                });
            }

            if (user.role !== 1) {
                return res.status(503).json({
                    message: 'Your donn\'t have authority to access.',
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
    create: async (req, res) => {
        try {
            const { reqId, email, password, firstName, lastName, role } = req.body;

            const user = await userModel.findOne({ email });

            if (user) {
                return res.status(503).json({
                    message: 'Email has already been registered.',
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

            const newUser = new userModel({ email, password: hashPassword, firstName, lastName, role });

            await newUser.save();

            return res.status(200).json({
                message: 'Create user success',
                data: undefined,
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Create user failed.',
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
    getAllUser: async (req, res) => {
        try {
            const { _id } = req.query;
            const user = await userModel.findById(_id);

            if (!(user && user.role === 1)) {
                return res.status(503).json({
                    message: 'User do not have authority.',
                    data: undefined,
                });
            }

            const users = await userModel.find();

            return res.status(200).json({
                message: undefined,
                data: users,
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Get list of user failed.',
                data: undefined,
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await userModel.findById(id);

            if (!user) {
                return res.status(503).json({
                    message: 'User has been already deleted.',
                    data: undefined,
                });
            }

            await userModel.findByIdAndDelete(id);

            const users = await userModel.find();

            return res.status(200).json({
                message: 'Delete user success.',
                data: users,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Delete user failed.',
                data: undefined,
            });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { reqId, firstName, lastName, email, password, role } = req.body;

            const reqUser = await userModel.findById(reqId);
            if (!(reqUser && reqUser.role === 1) || !(reqId === id)) {
                return res.status(503).json({
                    message: 'User do not have authority.',
                    data: undefined,
                });
            }

            const user = await userModel.findById(id);

            if (!user) {
                return res.status(503).json({
                    message: 'User is not exists.',
                    data: undefined,
                });
            }

            await userModel.findByIdAndUpdate(id, {
                firstName, lastName, email, password, role,
            });

            const users = await userModel.find();

            return res.status(200).json({
                message: 'Update user success.',
                data: users,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Update user failed.',
                data: undefined,
            });
        }
    },
};

export default controller;
