import bcrypt from 'bcrypt';
import userModel from '../models/user.js';

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
                return res.status(500).json({
                    message: 'Your password is in correct.',
                });
            }

            return res.status(200).json({
                message: 'OK',
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error.',
            });
        }
    },
    register: async (req, res) => {
        try {
            const { email, password, firstName, lastName } = req.body;

            const user = await userModel.findOne({ email });

            if (user) {
                return res.status(500).json({
                    message: 'Email has been registered.',
                });
            }

            if (password.length < 8 || password.length > 64) {
                return res.status(500).json({
                    message: 'Password length must between 8 and 64 characters.',
                });
            }

            const hashPassword = bcrypt.hashSync(password, 10);

            const newUser = new userModel({ email, password: hashPassword, firstName, lastName });

            await newUser.save();

            return res.status(200).json({
                message: 'New user has been created.',
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Error.',
            });
        }
    },
};

export default controller;
