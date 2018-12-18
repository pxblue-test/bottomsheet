import { Component } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet.html',
  styleUrls: [],
})
export class BottomSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheet>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
