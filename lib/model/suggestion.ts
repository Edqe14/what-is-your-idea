import { Schema, model, modelNames, Document, Types, ObjectId } from 'mongoose';

interface ISuggestion extends Document {
  _id: Types.ObjectId;
  parentId: ObjectId;
  response: string;
  prompt: string;
}

const schema = new Schema<ISuggestion>({
  parentId: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId()
  },
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  }
});

const modelObj = modelNames().includes('suggestion')
  ? model<ISuggestion>('suggestion')
  : model<ISuggestion>('suggestion', schema);
export default modelObj;