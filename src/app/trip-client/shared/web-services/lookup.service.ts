import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Globals } from '../Globals';
import { ILookupItem } from '../models/LooupItem';

@Injectable({
    providedIn: 'root'
})
export class ArptLookupService {

    constructor(private http: HttpClient, private globals: Globals) { }

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
