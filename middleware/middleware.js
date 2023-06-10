
import userModel from '../models/userModel.js';

export const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const user = await userModel.findById(authorization);

        if (!(user && user._id.toString())) {
            return res.status(503).json({
                message: 'Please login before use this system.',
                data: undefined,
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Login error.',
            data: undefined,
        });
    }
};

export const authAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const user = await userModel.findById(authorization);

        if (!(user && user._id.toString() && user.role === '1')) {
            return res.status(503).json({
                message: 'You do not authority for this action.',
                data: undefined,
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Authorization error.',
            data: undefined,
        });
    }
};
