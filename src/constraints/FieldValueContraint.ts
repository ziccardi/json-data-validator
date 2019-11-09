import {ConstraintInterface} from "./ConstraintInterface";
import { get } from 'lodash-es';

export class FieldValueContraint implements ConstraintInterface {
    private readonly config: any;

    constructor(config: any) {
        this.config = config;
    }

    /**
     * Returns true if the value retrieved at the configured path has the value specified into the configuration
     * @param data a dictionary containing the data to be validated
     * @returns {boolean}
     */
    isRespected(data: any): boolean {
        return get(data, this.config.path) === this.config.value;
    }
}