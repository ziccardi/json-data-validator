export interface Config {
  [key: string]: string | Config;
}

export interface ConstraintInterface {
  isRespected(data: Config): boolean;
}
