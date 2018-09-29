import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StoreService, SliceTypes } from '../store/store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dcm-display',
  templateUrl: './display.component.html',
})
export class DisplayComponent {

  public launches$: Observable<any>;

  constructor(private store: StoreService) {
    this.launches$ = this.store.select$(SliceTypes.fliteredLaunches);
  }

}
