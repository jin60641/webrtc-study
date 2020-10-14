import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Users',
  },
});

const model = mongoose.models.Posts || mongoose.model('Posts', PostSchema);

export default model;
