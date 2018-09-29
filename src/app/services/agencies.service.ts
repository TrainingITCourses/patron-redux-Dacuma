import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class AgenciesService {

  constructor(private http: HttpClient,
    private storeService: StoreService) { }

  public getAgencies(): Observable<any> {
    return this.http.get('assets/launchagencies.json');
  }

}
