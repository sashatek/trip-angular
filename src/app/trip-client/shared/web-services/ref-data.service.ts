import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Globals } from '../Globals';
import { ILookupItem } from '../models/LooupItem';
import { RefDataModel } from '../models/RefDataModel';

@Injectable({
    providedIn: 'root'
})
export class RefDataService {

    ref: RefDataModel = null;

    constructor(private http: HttpClient, private globals: Globals) { }

    getRefs() {
        const url = `${this.globals.baseApiUrl}RefData/GetAll`;
        return this.http
            .get<RefDataModel>(url)
            .pipe(
                tap(response => this.onGetRefs(response)
                ));

    }

    onGetRefs = (ref: RefDataModel) => {
        this.ref = ref;
    }

    lookup(term: string) {
        // const url = `${this.globals.baseAppUrl}/api/Lookup/Iata/${term}`
        const url = `${this.globals.baseApiUrl}Lookup/Iata/${term}`;
        if (term === '') {
            return of([]);
        }

        return this.http
            .get<ILookupItem[]>(url).pipe(
                map(response => response)
            );
    }

}
