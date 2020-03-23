import { Component, OnInit } from '@angular/core';
import { RefDataService } from '../shared/web-services/ref-data.service';

@Component({
  selector: 'app-trip-client',
  templateUrl: './trip-client.component.html',
  styleUrls: ['./trip-client.component.css']
})
export class TripClientComponent implements OnInit {

    viewMode = -1;

    constructor(private refService: RefDataService) { }

    ngOnInit() {
      this.refService.getRefs()
      .subscribe(refDate => {
        this.viewMode = 1;
      });
    }

    setView(viewNum: number) {
      this.viewMode = viewNum;
    }

    test() {
      alert('sdfdfsd');
    }

}
