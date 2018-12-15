import { Component, OnInit, ViewChild,  ElementRef } from '@angular/core';
import { VERSION } from '@angular/material';
import { BottomSheet } from './bottomsheet/bottom-sheet';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
   @ViewChild('morevert') morevert:ElementRef;
  constructor(private bottomSheet: MatBottomSheet, ) {

  }
  version = VERSION;
  data: any[] = [];

  public NOW = Date.now();
  public LOCATIONS = ['Dos Valley Field', 'Jameson Field', 'Parker Field West', 'Parker Field East', 'North Park Garden'];
  public DEVICES = ['MX Power Pro', 'PXL DG1', 'Pentair Aurora'];
  public DETAILS = ['Over Voltage Fault', 'Over Current Fault', 'Under Voltage Fault', 'Under Current Fault'];


  getRandomData() {
    const date = Math.round(this.NOW - Math.random() * 1000000);
    return {
      date: Math.round(this.NOW - Math.random() * 1000000000),
      active: Math.random() < .3,
      location: this.LOCATIONS[Math.floor(Math.random() * this.LOCATIONS.length)],
      device: this.DEVICES[Math.floor(Math.random() * this.DEVICES.length)],
      details: this.DETAILS[Math.floor(Math.random() * this.DETAILS.length)]
    }
  }

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.data.push(this.getRandomData());
    }
    console.log(JSON.stringify(this.data))
  }

  showBottomSheet(): void {
    this.bottomSheet.open(BottomSheet);
     this.morevert.nativeElement.focus();
  }
} 