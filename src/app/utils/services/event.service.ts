import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {KeyValuePairModel} from '../models/key-Value-Pair.model';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EventService<T> {
  protected events: KeyValuePairModel<Subject<T>>[];

  constructor() {
    this.events = [];
  }

  public broadcastEvent(key: string, value: any) {
    try {
      let keyValuePair = this.events.find((event) => {
        return event.key === key;
      });

      if (!keyValuePair) {
        keyValuePair = new KeyValuePairModel<Subject<T>>(key, new Subject<T>());
        this.events.push(keyValuePair);
      }
      keyValuePair.value.next(value);
    } catch (e) {
      console.error(e);
    }
  }

  public unSubscribeEvent(key: string) {
    try {
      const objectToBeUnSubscribed = _.find(this.events, {key: key});
      if (objectToBeUnSubscribed) {
        objectToBeUnSubscribed.value.unsubscribe();
        _.remove(this.events, {key: key});
      }
    } catch (e) {
      console.error(e);
    }
  }

  public getEvent(key: string): Observable<T> {
    try {
      const keyValuePair = this.events.find((sub) => {
        return sub.key === key;
      });

      if (keyValuePair) {
        return keyValuePair.value.asObservable();
      } else {
        const subject = new Subject<T>();
        this.events.push(
          new KeyValuePairModel<Subject<T>>(
            key,
            subject
          )
        );
        return subject.asObservable();
      }
    } catch (e) {
      console.error(e);
    }
  }
}
