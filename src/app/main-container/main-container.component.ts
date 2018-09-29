import { Component, OnInit } from '@angular/core';
import { AgenciesService } from '../services/agencies.service';
import { StatusService } from '../services/status.service';
import { MissionService } from '../services/mission.service';
import { LaunchService } from '../services/launch.service';
import { forkJoin } from 'rxjs';
import { Options } from '../options';
import { StoreService, SliceTypes } from '../store/store.service';
import { LoadAgencies, LoadMissions, LoadStatuses, LoadFilteredLaunches } from '../store/store.actions';

@Component({
  selector: 'dcm-main-container',
  templateUrl: './main-container.component.html',
})
export class MainContainerComponent implements OnInit {

  public agencies;
  public missions;
  public statuses;
  isLoading: boolean;
  public launches = [];

  constructor(private _agenciesService: AgenciesService,
    private _missionService: MissionService,
    private _statusService: StatusService,
    private _launchService: LaunchService,
    private _storeService: StoreService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    forkJoin(
      this._agenciesService.getAgencies(),
      this._missionService.getMissions(),
      this._statusService.getStatuses()
    ).subscribe(
      data => {
        this._storeService.dispatch(new LoadAgencies(data[0].agencies));
        this._storeService.dispatch(new LoadMissions(data[1].types));
        this._storeService.dispatch(new LoadStatuses(data[2].types));
        this.isLoading = false;
      },
      err => console.error(err)
    );

    this._storeService.select$(SliceTypes.value)
      .subscribe(value => {
        switch (this._storeService.selectSnapshot(SliceTypes.option)) {
          case Options.agency:
            this._launchService.getByAgency(value)
              .subscribe(launches => {
                this._storeService.dispatch(new LoadFilteredLaunches(launches));
              });
            break;
          case Options.mission:
            this._launchService.getByMission(value)
              .subscribe(launches => {
                this._storeService.dispatch(new LoadFilteredLaunches(launches));
              });
            break;
          case Options.status:
            this._launchService.getByStatus(value)
              .subscribe(launches => {
                this._storeService.dispatch(new LoadFilteredLaunches(launches));
              });
            break;
        }
      });
  }
}
