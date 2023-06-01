import userModel from '../models/userModel.js';
import authorityModel from '../models/authorityModel.js';

const controller = {
    getAll: async (req, res) => {
        try {
            const authorities = await authorityModel.find();
            return res.status(200).json({
                message: undefined,
                data: authorities,
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Get list of authority failed.',
                data: undefined,
            });
        }
    },
    create: async (req, res) => {
        try {
            const { name } = req.body;

            const authority = await authorityModel.findOne({ name });

            if (authority) {
                return res.status(503).json({
                    message: 'This role is already exists.',
                    data: undefined,
                });
            }

            const newAuthority = new authorityModel({ name });
            newAuthority.save();

            return res.status(200).json({
                message: 'A new role has been created.',
                data: undefined,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Create authority failed.',
                data: undefined,
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const authority = await authorityModel.findById(id);
            if (!authority) {
                return res.status(503).json({
                    message: 'Authority is not exists.',
                    data: undefined,
                });
            }

            await authorityModel.findByIdAndDelete(id);

            return res.status(200).json({
                message: 'Delete authority success.',
                data: undefined,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Delete authority failed.',
                data: undefined,
            });
        }
    },
};

export default controller;
