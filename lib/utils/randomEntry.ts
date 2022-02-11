/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function randomEntry<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}