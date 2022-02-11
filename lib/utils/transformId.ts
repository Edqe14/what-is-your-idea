/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import { Document, ToObjectOptions } from 'mongoose';

export function transformId<T>(document: Document<T>, options?: ToObjectOptions | undefined, keys: string[] = []) {
  const obj = document.toObject(options);

  obj.id = obj._id;

  const allKeys = ['_id', ...keys];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allKeys.forEach((key) => delete (obj as any)[key]);

  return obj;
};