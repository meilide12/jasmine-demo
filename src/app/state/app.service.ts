import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AppStore } from './app.store';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AppService {

  constructor(private appStore: AppStore,
    private http: HttpClient) {
  }

  get() {
    return this.http.get(environment.base + 'init').pipe(tap(entities => this.appStore.update(entities)));
  }
}
