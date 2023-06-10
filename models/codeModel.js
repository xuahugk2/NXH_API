import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    codeClass: {
        type: String,
        required: true,
    },
    codeName: {
        type: String,
        required: true,
    },
    codeValue: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('code', schema);
