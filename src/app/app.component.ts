import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/material';
import { BottomSheet } from './bottomsheet/bottom-sheet';
import { MatBottomSheet } from '@angular/material';
import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet, private dataService:DataService) {

  }
  version = VERSION;
  data: any[] = [];

  ngOnInit(){
    this.data = this.dataService.data;
  }

  showBottomSheet(): void {
    this.bottomSheet.open(BottomSheet);
  }
} 