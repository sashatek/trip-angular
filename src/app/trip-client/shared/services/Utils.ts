import { NgbDate, NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";
import { ILookupItem } from "./LooupItem";


export function isoToNgbDate(isoDate: string): NgbDate{
    if (isoDate) {
        var date = new Date(isoDate);
        return new NgbDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
    }
    return null;
}

@Injectable()
export class NgbUTCStringAdapter extends NgbDateAdapter<string> {

  fromModel(date: string): NgbDateStruct {
    return (date && Number(date.substring(0, 4)) && Number(date.substring(5, 7) + 1) && Number(date.substring(8, 10))) ?
                {year: Number(date.substring(0, 4)),
                    month: Number(date.substring(5, 7)),
                    day: Number(date.substring(8, 10))} : null;
  }

  toModel(date: NgbDateStruct): string {
    return date ? date.year.toString() + '-' + String('00' + date.month).slice(-2)
                            + '-' + String('00' + date.day).slice(-2) : null;
  }
}

function padNumber(value: number) {
  if (isNumber(value)) {
      return `0${value}`.slice(-2);
  } else {
      return "";
  }
}

function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}


@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
      if (value) {
          const dateParts = value.trim().split('/');
          if (dateParts.length === 1 && isNumber(dateParts[0])) {
              return {year: toInteger(dateParts[0]), month: null, day: null};
          } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
              return {year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null};
          } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
              return {year: toInteger(dateParts[2]), month: toInteger(dateParts[0]), day: toInteger(dateParts[1])};
          }
      }   
      return null;
  }

  format(date: NgbDateStruct): string {
      let stringDate: string = ""; 
      if(date) {
        stringDate += isNumber(date.month) ? padNumber(date.month) + "/" : "";
        stringDate += isNumber(date.day) ? padNumber(date.day) + "/" : "";
          stringDate += date.year;
      }
      return stringDate;
  }

}

export function findRef(ref:ILookupItem[], value: number) : ILookupItem {
  for (const item of ref) {
    if (item.id === value) {
      return item;
    }
  }
  return {id:-1, text: "Error"};
}

function clone(): any {
  var cloneObj = new (<any>this.constructor());
  for (var attribut in this) {
      if (typeof this[attribut] === "object") {
          cloneObj[attribut] = this.clone();
      } else {
          cloneObj[attribut] = this[attribut];
      }
  }
//   const obj1 = { param: "value" };
// const obj2 = { ...obj1 };
  return cloneObj;
}