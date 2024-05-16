import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    _http = inject(HttpClient)

    async getCountries(): Promise<any> {
        const url = `${environment.api_url}getCountries`;
        return lastValueFrom(this._http.get(url))
            .catch(err => {
                console.warn(err)
                return []
            })    
    }

    async getCities(countries_id: any){
        const url = `${environment.api_url}getCities/${countries_id}`;
        return lastValueFrom(this._http.get(url))
            .catch(err => {
                console.warn(err)
                return []
            })  
    }

    async getWeather(name_city: any){
        const url = `${environment.api_url_weather}&q=${name_city}`;
        return lastValueFrom(this._http.get(url))
            .catch(err => {
                console.warn(err)
                return []
            })  
    }

    /*getCountries(data: any): Observable<any> {
        let url = `${environment.api_url}getCountries`;
        return this._http.post(url, data).pipe(
          catchError((error) => {
            console.log('Error en el API', error);
            return throwError('Error en el API');
          })
        );
    }*/
}