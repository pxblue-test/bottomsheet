import { 
  Component, 
  ViewEncapsulation
} from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottomsheet.component.html',
  styleUrls: ['./bottomsheet.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BottomsheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>) {}

// this is the placeholder for actual functionality
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
