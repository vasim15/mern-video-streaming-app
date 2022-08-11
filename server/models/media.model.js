import mongoose from 'mongoose'
const mediaSchema = new mongoose.Schema({
    title: {type: String, required: [true,'title is required']},
    description: {type: String, required: false},
    genre: {type: String, required: false},
    views: {type: Number, default:0},
    postedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created:{ type: Date, default: Date.now },
    updated:{type: Date}
})

export default mongoose.model('Media', mediaSchema);