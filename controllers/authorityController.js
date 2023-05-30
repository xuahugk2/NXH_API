
import authorityModel from '../models/authorityModel.js';

const controller = {
    create: async (req, res) => {
        try {
            const { name } = req.body;

            const authority = await authorityModel.findOne({ name });

            if (authority) {
                return res.status(500).json({
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
                message: 'Login failed.',
                data: undefined,
            });
        }
    },
};

export default controller;
