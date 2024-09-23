import { model, Schema } from 'mongoose';

const WebSchema = new Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

const Web = model('Web', WebSchema);

export default Web;
