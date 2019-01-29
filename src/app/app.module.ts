import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BottomSheet} from './bottomsheet/bottom-sheet';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';

import {AppComponent} from './app.component';
import { DataService } from './data.service';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MaterialModule
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
    MaterialModule
  ],
    entryComponents: [BottomSheet],
  declarations: [AppComponent,BottomSheet ],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule {}