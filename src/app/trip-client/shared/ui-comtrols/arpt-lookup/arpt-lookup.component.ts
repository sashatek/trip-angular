import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ILookupItem } from '../../models/LooupItem';
import { ArptLookupService } from '../../web-services/arpt-lookup.service';

@Component({
  selector: 'app-airport-lookup',
  templateUrl: './arpt-lookup.component.html',
  styleUrls: ['./arpt-lookup.component.css']
})

export class ArptLookupComponent implements OnInit {
    searching = false;
    searchFailed = false;
    @Input() parentForm: FormGroup;
    @Input() formFieldName: string;

    @Output() airportSelect = new EventEmitter<ILookupItem>();

    constructor(private arptService: ArptLookupService) { }

    ngOnInit() {
      // this.parentForm.addControl();
    }

    lookupArpt = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.searching = true),
        switchMap(term =>
          this.arptService.lookup(term).pipe(
            tap(() => this.searchFailed = false),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            }))
        ),
        tap(() => this.searching = false)
      )

      // formatter = (result: ILookupItem) => result.text;
      formatter(result: ILookupItem): string {
        return result.text + '   ' + result.text2;
      }
      formatterr(result: ILookupItem): string {
        return result.text + ' ' + result.text2;
      }

      select(event: NgbTypeaheadSelectItemEvent) {
        this.airportSelect.emit(event.item as ILookupItem);
      }
  }
