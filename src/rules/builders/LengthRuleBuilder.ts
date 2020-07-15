import * as LengthRule from '../LengthRule';

export const builder = {
  withLength: (length: number) => ({type: LengthRule.NAME, length}),
};
