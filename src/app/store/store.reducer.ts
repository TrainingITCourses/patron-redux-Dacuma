import { initialState, State } from '../models/state.model';
import { Actions, ActionTypes } from './store.actions';


export function storeReducer(
    state: State = initialState,
    action: Actions
) {
    const result: State = { ...state };

    switch (action.action) {
        case ActionTypes.loadAgencies:
            result.agencies = action.payload;
            break;
        case ActionTypes.loadMissions:
            result.missions = action.payload;
            break;
        case ActionTypes.loadStatuses:
            result.statuses = action.payload;
            break;
        case ActionTypes.optionChange:
            result.option = action.payload;
            break;
        case ActionTypes.valueChange:
            result.value = action.payload;
            break;
        case ActionTypes.loadFilteredLaunches:
            result.fliteredLaunches = action.payload;
            break;
    }

    return result;
}
