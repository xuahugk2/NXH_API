import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    authorityId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('authority', schema);
