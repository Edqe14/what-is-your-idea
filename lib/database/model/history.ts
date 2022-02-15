import { Schema, model, modelNames, Document, Types } from 'mongoose';

export interface IHistory extends Document {
  _id: Types.ObjectId;
  model: string;
  input: string;
  response: string;
  timestamp: number;
}

const schema = new Schema<IHistory>({
  model: {
    type: String,
    required: true,
    enum: ['text-ada-001', 'text-babbage-001', 'text-curie-001', 'text-davinci-001'],
    default: () => 'text-davinci-001',
  },
  input: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    default: () => Date.now()
  }
});

const modelObj = modelNames().includes('history')
  ? model<IHistory>('history')
  : model<IHistory>('history', schema);
export default modelObj;