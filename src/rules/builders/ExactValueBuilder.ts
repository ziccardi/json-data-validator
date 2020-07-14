export const builder = {
  withValue: (value: string | number) => ({ type: 'EXACT_VALUE', value }),
  withPathAndValue: (path: string, value: string | number) => ({
    type: 'EXACT_VALUE',
    path,
    value,
  }),
};
