import { Injectable } from '@angular/core';
import { State, initialState } from '../models/state.model';
import { BehaviorSubject } from 'rxjs';
import { Actions, ActionTypes } from './store.actions';
import { storeReducer } from './store.reducer';

export enum SliceTypes {
  fliteredLaunches = 0,
  missions = 1,
  agencies = 2,
  statuses = 3,
  option = 4,
  value = 5
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private state: State = { ...initialState };
  private fliteredLaunches$ = new BehaviorSubject<any>(this.state.fliteredLaunches);
  private missions$ = new BehaviorSubject<any>(this.state.missions);
  private agencies$ = new BehaviorSubject<any>(this.state.agencies);
  private statuses$ = new BehaviorSubject<any>(this.state.statuses);
  private option$ = new BehaviorSubject<any>(this.state.option);
  private value$ = new BehaviorSubject<any>(this.state.value);

  constructor() { }

  public select$(slice: SliceTypes) {
    switch (slice) {
      case SliceTypes.fliteredLaunches:
        return this.fliteredLaunches$.asObservable();
      case SliceTypes.agencies:
        return this.agencies$.asObservable();
      case SliceTypes.missions:
        return this.missions$.asObservable();
      case SliceTypes.statuses:
        return this.statuses$.asObservable();
      case SliceTypes.option:
        return this.option$.asObservable();
      case SliceTypes.value:
        return this.value$.asObservable();
    }
  }

  public selectSnapshot(slice: SliceTypes) {
    switch (slice) {
      case SliceTypes.fliteredLaunches:
        return [...this.state.fliteredLaunches];
      case SliceTypes.agencies:
        return [...this.state.agencies];
      case SliceTypes.missions:
        return [...this.state.missions];
      case SliceTypes.statuses:
        return [...this.state.statuses];
      case SliceTypes.option:
        return this.state.option;
      case SliceTypes.value:
        return this.state.value;
    }
  }

  public dispatch(action: Actions) {
    console.log(`dispatching: ${action.action}`);
    this.state = storeReducer(this.state, action);

    switch (action.action) {
      case ActionTypes.loadFilteredLaunches:
        this.fliteredLaunches$.next([...this.state.fliteredLaunches]);
        break;
      case ActionTypes.loadAgencies:
        this.agencies$.next([...this.state.agencies]);
        break;
      case ActionTypes.loadMissions:
        this.missions$.next([...this.state.missions]);
        break;
      case ActionTypes.loadStatuses:
        this.statuses$.next([...this.state.statuses]);
        break;
      case ActionTypes.optionChange:
        this.option$.next(this.state.option);
        break;
      case ActionTypes.valueChange:
        this.value$.next(this.state.value);
        break;
    }
  }

}


