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

    /**
     * 
     * Método que consulta los registros previos
     * 
     * A través de este método se consultan los registros almacenados
     * en la tabla history, que corresponden a las búsquedas realizadas
     * por los usuarios, hasta 5 registros en orden descendente
     * 
     * @return Promise History[] || false
     * 
     */
    async getHistory(): Promise<any>{
        const url = `${environment.api_url}getHistory`;
        return lastValueFrom(this._http.get(url))
            .catch(err => {
                console.warn(err)
                return []
            })  
    }

    /**
     * 
     * Método que almacena las búsquedas realizadas
     * 
     * A través de este método se envían en formato JSON los datos
     * seleccionados por el usuario para ser enviados hacia la base
     * de datos
     * 
     * @param array data
     * 
     */
    async saveHistory(data: any): Promise<any> {
        let url = `${environment.api_url}saveHistory`;
        return this._http.post(url, JSON.stringify(data)).toPromise().then().catch(err => {
            console.warn(err)
            return false
        });
    }

    /**
     * 
     * @returns Promise Countries[] || false
     */
    async getCountries(): Promise<any> {
        const url = `${environment.api_url}getCountries`;
        return lastValueFrom(this._http.get(url))
            .catch(err => {
                console.warn(err)
                return []
            })    
    }

    /**
     * @param int countries_id
     * @returns Promise Cities[] || false
     */
    async getCities(countries_id: any): Promise<any>{
        const url = `${environment.api_url}getCities/${countries_id}`;
        return lastValueFrom(this._http.get(url))
            .catch(err => {
                console.warn(err)
                return []
            })  
    }

    /**
     * 
     * @param name_city 
     * @returns Promise dataWeather[] || false
     */
    async getWeather(name_city: any): Promise<any>{
        const url = `${environment.api_url_weather}&q=${name_city}`;
        return lastValueFrom(this._http.get(url))
            .catch(err => {
                console.warn(err)
                return []
            })  
    }
}