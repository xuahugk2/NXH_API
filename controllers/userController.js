import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import { sendMail } from '../utils/sendMailUtil.js';

const controller = {
    getAllUser: async (req, res) => {
        try {
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
    create: async (req, res) => {
        try {
            const { email, password, firstName, lastName, role } = req.body;

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
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { firstName, lastName, email, password, role } = req.body;

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

            return res.status(200).json({
                message: 'Update user success.',
                data: undefined,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Update user failed.',
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

            return res.status(200).json({
                message: 'Delete user success.',
                data: undefined,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Delete user failed.',
                data: undefined,
            });
        }
    },
};

export default controller;
