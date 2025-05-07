import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

// const _BASE_URL_PRODUCTION = "https://backend.rgpsai.org/"; //producción
const _BASE_URL_PRODUCTION = "https://backendpruebas.rgpsai.org/"; //sandbox
// const _BASE_URL_PRODUCTION = "http://rgpsai.test/"; //sandbox
// const _BASE_URL_PRODUCTION = "http://rgpsais.test/"; //sandbox
const apiLogin = _BASE_URL_PRODUCTION+"oauth/token"; 
const apiStoreIndustrials = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/inspeccion_industrial_industrial"; 
const apiStoreArtesanals = _BASE_URL_PRODUCTION + "api/rpg-sai/v1/inspeccion_industrial_artesanal"; 
const apiSetDataProfile = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/auth-user"; 
const apiSearchVessels = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/apprgp/all-boats-search/";
const apiSearchPescador = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/apprgp/all-fishermen/UNO";
const apiStorePescador = _BASE_URL_PRODUCTION + "api/rpg-sai/v1/apprgp/create/fisherman-request"; 
//dropdowns
const apiListPortsOfLanding = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/apprgp/port-of-landing"; 
const apiListFishingArts = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/apprgp/fishing-arts";  
const apiListFishinArtsBoat = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/apprgp/fishing-arts-boats";  
const apiListTypesOfFishery = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/apprgp/types-of-fishery";  
const apiListRegistrationPorts = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/apprgp/registration-port";  
const apiListCompanies = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/apprgp/all-companies";
const apiListOrganizations = _BASE_URL_PRODUCTION+"api/rpg-sai/v1/apprgp/get-organizations";

@Injectable({
    providedIn: 'root'
})

export class ApiRestService {

    constructor(private http: HttpClient) {}

    //login auth
    getLogin(info:Object): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
	    let body= JSON.stringify(info);
	    let response = this.http.post(apiLogin, body, {headers});
	    return forkJoin([response]);
    }

    //store industrials
    getStoreIndustrials(info:Object, header): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    let body= JSON.stringify(info);
	    let response = this.http.post(apiStoreIndustrials, body, {headers});
	    return forkJoin([response]);
    }

    //store artesanals
    getStoreArtesanals(info:Object, header): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    let body= JSON.stringify(info);
	    let response = this.http.post(apiStoreArtesanals, body, {headers});
	    return forkJoin([response]);
    }

    //data profile
    setDataProfile(info:Object, header): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    let body= JSON.stringify(info);
	    let response = this.http.post(apiSetDataProfile, body, {headers});
	    return forkJoin([response]);
    }

    //search vessels
    searchVessel(header, params): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    //let body= JSON.stringify(info);
	    let response = this.http.get(apiSearchVessels+params, {headers});
	    return forkJoin([response]);
    }

    //search pescador
    searchPescador(header, params): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    let response = this.http.get(apiSearchPescador+'?search='+params, {headers});
	    console.log(response)
        return forkJoin([response]);
    }

    //store pescador
    getStorePescador(info:Object, header): Observable<any> {
        // console.log(info);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    let body= JSON.stringify(info);
	    let response = this.http.post(apiStorePescador, body, {headers});
	    return forkJoin([response]);
    }

    /**
     * Dropdowns
    */

    //dropdown ports
    listDropdownPortsOfLanding(header): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    //let body= JSON.stringify(info);
	    let response = this.http.get(apiListPortsOfLanding, {headers});
	    return forkJoin([response]);
    }

    //dropdown fishing arts
    listDropdownFishingArts(header): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    //let body= JSON.stringify(info);
	    let response = this.http.get(apiListFishingArts, {headers});
	    return forkJoin([response]);
    }

    //dropdown fishing arts boat
    listDropdownFishingArtsBoat(header): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    //let body= JSON.stringify(info);
	    let response = this.http.get(apiListFishinArtsBoat, {headers});
	    return forkJoin([response]);
    }

    //dropdown types of fishery
    listDropdownTypesOfFishery(header): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    //let body= JSON.stringify(info);
	    let response = this.http.get(apiListTypesOfFishery, {headers});
	    return forkJoin([response]);
    }

    //dropdown registration ports
    listDropdownRegistrationPorts(header): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    //let body= JSON.stringify(info);
	    let response = this.http.get(apiListRegistrationPorts, {headers});
	    return forkJoin([response]);
    }

    //dropdown companies
    listDropdownCompanies(header): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    //let body= JSON.stringify(info);
	    let response = this.http.get(apiListCompanies, {headers});
	    return forkJoin([response]);
    }

    //dropdown organizations
    listDropdownOrganizations(header): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', header);
	    //let body= JSON.stringify(info);
	    let response = this.http.get(apiListOrganizations, {headers});
	    return forkJoin([response]);
    }
}
