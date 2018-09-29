import { OptionChange, ValueChange } from './../store/store.actions';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Options } from '../options';
import { SliceTypes, StoreService } from '../store/store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dcm-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  public values;

  optionsForm: FormGroup;
  public option = Options.status;
  valuesForm: FormGroup;

  constructor(private store: StoreService) {
    this.optionsForm = new FormGroup({
      option: new FormControl(null)
    });
    this.optionsForm.controls['option'].setValue(this.option, { onlySelf: true });

    this.valuesForm = new FormGroup({
      value: new FormControl(null)
    });
    this.store.select$(SliceTypes.option).subscribe(opcion => {
      switch (opcion) {
        case Options.status:
          this.values = this.store.selectSnapshot(SliceTypes.statuses);
          break;
        case Options.mission:
          this.values = this.store.selectSnapshot(SliceTypes.missions);
          break;
        case Options.agency:
          this.values = this.store.selectSnapshot(SliceTypes.agencies);
          break;
      }
    });
  }

  ngOnInit() {
    this.initForms();
  }

  initForms(): void {
    this.optionsForm.valueChanges.subscribe(val => {
      this.store.dispatch(new OptionChange(val.option));
      this.valuesForm.controls['value'].setValue(null);
    });
    this.valuesForm.valueChanges.subscribe(val => {
      if (val.value) { this.store.dispatch(new ValueChange(val.value)); }
    });
  }
}
