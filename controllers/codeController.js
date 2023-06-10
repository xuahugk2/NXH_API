import codeModel from '../models/codeModel.js';

const controller = {
    getAll: async (req, res) => {
        try {
            const codes = await codeModel.find({});
            return res.status(200).json({
                message: undefined,
                data: codes,
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Cannot get specified data.',
                data: undefined,
            });
        }
    },
    create: async (req, res) => {
        try {
            const { data } = req.body;

            if (Array.isArray(data)) {
                await codeModel.insertMany([...data]);
            } else {
                const newCode = new codeModel({ ...data });

                await newCode.save();
            }

            res.status(200).json({
                message: 'Adding new codes success.',
                data: undefined,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Cannot create specified data.',
                data: undefined,
            });
        }
    },
};

export default controller;
