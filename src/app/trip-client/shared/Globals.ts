import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
    // baseAppUrl = 'http://localhost:49394';
    baseAppUrl = 'https://localhost:44311';
    baseApiUrl = `${this.baseAppUrl}/api/`;
}