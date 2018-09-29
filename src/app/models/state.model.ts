import { Options } from './../options';

export interface State {
    fliteredLaunches: any[];
    missions: any[];
    agencies: any[];
    statuses: any[];
    option: Options;
    value: number;
}

export const initialState: State = {
    fliteredLaunches: [],
    missions: [],
    agencies: [],
    statuses: [],
    option: Options.status,
    value: -1
};
