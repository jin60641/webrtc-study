import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  connectionId: String,
});

const model = mongoose.models.Sessions || mongoose.model('Sessions', SessionSchema);

export default model;
