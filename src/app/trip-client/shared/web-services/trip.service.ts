import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Globals } from '../Globals';
import { TripModel } from '../models/TripModel';

@Injectable({
  providedIn: 'root'
})
export class TripService {

    constructor(private http: HttpClient, private globals: Globals) { }

    getAllTrips() {
      const qry = '1';
      const url = `${this.globals.baseApiUrl}Trip/GetAll`;
      return this.http
      .get<TripModel[]>(url)
      .pipe(
        tap(response => this.onGetTrips(response)),
        catchError(e => this.handleError(e))
        );
    }


    onGetTrips(trips: TripModel[]) {
      for (const trip of trips) {
          trip.isNew = false;
     }
      return trips;
    }

    addTrip(model: TripModel) {
      const url = `${this.globals.baseApiUrl}Trip/PostTrip`;
      return this.http
        .post<TripModel>(url, model)
         .pipe(
          tap(trip => {
            model.tripId = trip.tripId;
            model.isNew = false;
          }), // this.onGetTrips(response),
          catchError(this.handleError)
        );
    }

    saveTrip(model: TripModel) {
      const url = `${this.globals.baseApiUrl}Trip/${model.tripId}`;
      return this.http
        .put<TripModel>(url, model)
        .pipe(
          tap(trip => {
           }), // this.onGetTrips(response),
          catchError(this.handleError)
        );
    }
    deleteTrip(model: TripModel) {
      const url = `${this.globals.baseApiUrl}Trip/${model.tripId}`;
      return this.http
        .delete<TripModel>(url)
        .pipe(
          catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        let message = error.status + ' ' + error.statusText;
        if (error.error && error.error.message) {
          message += '\r' + error.error.message;
        }

        if (error.message) {
          message += '\r' + error.message;
        }
        // console.error(
        //   `Backend returned code ${error.status}, ` +
        //   `body was: ${error.error}`);
        alert(message);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }
  }
