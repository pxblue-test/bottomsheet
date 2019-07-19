import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BottomSheet} from './bottomsheet/bottom-sheet';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import {AppComponent} from './app.component';
import { DataService } from './data.service';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatBottomSheetModule,
  ]
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
 
  ],
    entryComponents: [BottomSheet],
  declarations: [AppComponent,BottomSheet ],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule {}