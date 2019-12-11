import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './data.service';
import * as Colors from '@pxblue/colors';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomsheetComponent } from './bottomsheet/bottomsheet.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  data = [];
  toggleNotification = false;
  Colors: Object = Colors;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService

  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.data = this.dataService.data;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  showBottomSheet(): void {
    this.bottomSheet.open(BottomsheetComponent, {restoreFocus: false, panelClass: 'bottomPanel'});
  }
}
