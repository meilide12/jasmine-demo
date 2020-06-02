import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AppState {
  key: string;
}

export function createInitialState(): AppState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {

  constructor() {
    super(createInitialState());
  }

}

