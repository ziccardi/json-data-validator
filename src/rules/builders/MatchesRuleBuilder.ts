export const builder = {
  withPattern: (pattern: string | RegExp) => ({type: 'matches', pattern}),
};
