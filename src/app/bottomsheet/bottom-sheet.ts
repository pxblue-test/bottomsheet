import { Component, ViewChild, ElementRef } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet.html',
  styleUrls: [],
})
export class BottomSheet {
   @ViewChild('morevert') morevert:ElementRef;
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheet>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
     this.morevert.nativeElement.focus();
  }
}
