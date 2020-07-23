import {RuleConfig} from '../../config/RuleConfig';

export interface IsBase64BuilderWithPathBuilder {
  build: () => RuleConfig;
}

export interface IsBase64InitialBuilder extends IsBase64BuilderWithPathBuilder {
  withPath: (path: string) => IsBase64BuilderWithPathBuilder;
}

export const builder: IsBase64InitialBuilder = {
  withPath: (path: string): IsBase64BuilderWithPathBuilder => {
    const rule = {type: 'isBase64', path};
    return {
      build: () => rule,
    };
  },
  build: (): RuleConfig => ({type: 'isBase64'}),
};
