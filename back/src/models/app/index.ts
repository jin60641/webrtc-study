import mongoose from 'mongoose';

const AppSchema = new mongoose.Schema({
  appId: String,
  appName: String,
});

const model = mongoose.models.Apps || mongoose.model('Apps', AppSchema);

export default model;
