export const builder = {
  withValues: (...values: string[]) => ({
    type: 'isIn',
    values: values.join(),
  }),
};
