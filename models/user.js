import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

export default mongoose.model('user', schema);
