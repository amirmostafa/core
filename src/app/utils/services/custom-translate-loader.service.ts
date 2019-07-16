/*author: amostafa*/
import {Observable} from 'rxjs';
import {TranslateLoader} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateLoaderService implements TranslateLoader {
  constructor(private http: HttpClient) {
  }

  public getTranslation(lang: string): Observable<any> {
    return new Observable(obs => {
      try {
        const params = new HttpParams().set('ignoreEditingURL', 'true');
        const obs1 = this.http.get(`assets/localization/${lang}.json`, {params});
        obs1.subscribe(value => {
            obs.next(value);
        });
      } catch (e) {
        console.error(e);
      }
    });
  }
}
