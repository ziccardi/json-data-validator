export const builder = {
  required: (path?: string) => ({
    type: 'REQUIRED',
    path,
  }),
};
