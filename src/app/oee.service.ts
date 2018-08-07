import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient }   from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

import { IOee } from './oee';

@Injectable({
  providedIn: 'root'
})
export class OeeService {
    private _oeeUrl = 'http://localhost/OEEWebAPI/api/v1/OEE';

    constructor(private _http: HttpClient) { 
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        headers.append('Access-Control-Allow-Headers', 'x-id');
    }

    getOees(): Observable<IOee[]> {
        // return this._http.get(this._oeeUrl).pipe(
        //     map((response: Response) => <IOee[]> response.json()),
        //     catchError(this.handleError));
        return this._http.get<IOee[]>(this. _oeeUrl);
    }

    getOee(id: number): Observable<IOee> {
        return this.getOees().pipe(
            map((oees: IOee[]) => oees.find(x => x.oeeid === id)));
    }

    createOee(oee: IOee): Observable<IOee> {
        return this._http.post(this._oeeUrl + 'oee/', JSON.stringify(oee)).pipe(
            map((res: Response) => {
                return res.json();
            }),
            catchError(this.handleError));
    }
 
    updateOee(oee: IOee): Observable<void> {
        return this._http.put(this._oeeUrl + 'oee/' + oee.oeeid, JSON.stringify(oee)).pipe(
            map((res: Response) => {
                return;
            }),
            catchError(this.handleError));
    }
 
    deleteOee(id: number): Observable<void> {
        return this._http.delete(this._http + 'oee/' + id).pipe(
            map((res: Response) => {
                return;
            }),
            catchError(this.handleError));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
