import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  currentCopPrice!:number;
  constructor(private _http:HttpClient) { }

  async getContentHtmlExternalPage(urlPage:string):Promise<any>{ 
    const url = `${environment.api_url}getContentHtmlExternalPage?urlPage=${urlPage}`; 
    return firstValueFrom(this._http.get(url)).then()
      .catch(err => {
        console.warn(err)
        return false
      })
  }

  /**
   * 
   * @returns Price Colombian pesos COP by usd
   */
  public async getCurrencyConverter(currency: any):Promise<number>{
    const urlPage = `https://www.google.com/finance/quote/${currency}-COP?sa=X&ved=2ahUKEwiBpd_lo5L7AhV1VTABHSOsBHgQmY0JegQIBhAc`;
    const {html} = await this.getContentHtmlExternalPage(urlPage);
    
    if (html){
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(html, 'text/html');
      if (htmlDoc){
        let copPrice = htmlDoc.querySelector('.fxKbKc')?.textContent;
        if (copPrice){
          const price = copPrice.replace(/,/g, '');
          return Number(price);
        }

      }
    }

    return 0;
  }


  /*async convertCopToUsdProjects(projects:Project[]):Promise<Project[] | null>{
    const priceCop = await this.getCopPriceByUsd()

    if (priceCop && projects?.length > 0){
      if (projects.length > 0){
        return projects.map( (p) => {
          if (p?.valor_proyecto){
            p.dollar_value = Number(p?.valor_proyecto)/priceCop
            p.dollar_value = Math.trunc(p.dollar_value); // remove decimals
          }
          return p;
        })
      }
    }

    return null

  }*/

}
