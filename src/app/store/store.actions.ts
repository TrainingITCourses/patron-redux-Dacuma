export enum ActionTypes {
    loadFilteredLaunches = 'Load filtered launches',
    loadMissions = 'Load missions',
    loadAgencies = 'Load agencies',
    loadStatuses = 'Load statuses',
    optionChange = 'Option change',
    valueChange = 'Value change'
}

export interface Action {
    readonly action: ActionTypes;
    readonly payload?: any;
}

export class LoadFilteredLaunches implements Action {
    public readonly action = ActionTypes.loadFilteredLaunches;
    constructor(public readonly payload?: any) { }
}

export class LoadMissions implements Action {
    public readonly action = ActionTypes.loadMissions;
    constructor(public readonly payload?: any) { }
}
export class LoadAgencies implements Action {
    public readonly action = ActionTypes.loadAgencies;
    constructor(public readonly payload?: any) { }
}

export class LoadStatuses implements Action {
    public readonly action = ActionTypes.loadStatuses;
    constructor(public readonly payload?: any) { }
}

export class OptionChange implements Action {
    public readonly action = ActionTypes.optionChange;
    constructor(public readonly payload?: any) { }
}

export class ValueChange implements Action {
    public readonly action = ActionTypes.valueChange;
    constructor(public readonly payload?: any) { }
}


export type Actions = LoadFilteredLaunches | LoadMissions | LoadAgencies | LoadStatuses | OptionChange | ValueChange;
