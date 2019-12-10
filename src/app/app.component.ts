import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './data.service';
import * as Colors from '@pxblue/colors';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  list = [];
  toggleNotification = false;
  Colors: Object = Colors;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService

  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.list = this.dataService.data;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openNotification() {
    this.toggleNotification = true;
  }
  closeNotification() {
    this.toggleNotification = false;
  }
}
