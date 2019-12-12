import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
// import { BottomSheetComponent } from './bottomsheet/bottomsheet.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      imports: [AppModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
      ],
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initialize the app',  async() => {
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  it('should call showBottomSheet() when clicking the top right icon', () => {
    fixture.detectChanges();
    spyOn(app, 'showBottomSheet');
    const buttonElt = fixture.nativeElement.querySelector('.toolbar-button');
    buttonElt.click();
    expect(app.showBottomSheet).toHaveBeenCalled();
  });

  it('should display the bottom sheet when clicking the top right icon', () => {
    fixture.detectChanges();
    let bottomPanalElt = document.getElementById('bottom-panal');
    expect(bottomPanalElt).toBeFalsy();

    app.showBottomSheet();
    fixture.detectChanges();
    bottomPanalElt = document.getElementById('bottom-panal');
    expect(bottomPanalElt).toBeTruthy();
  });

  // it('should call their eventHandler openLink() when clicking on the menu item', () => {
  //   expect(true).toBeTruthy();
  //   const buttonElt = fixture.nativeElement.querySelector('.toolbar-button');
  //   buttonElt.click();
  //   const bottomPanalElt = fixture.debugElement.query(By.css('.bottom-panal'));
  //   spyOn(bottomPanalElt, 'openLink');
  //   const matListItem = bottomPanalElt.nativeElement.querySelector('mat-list-item');
  //   matListItem.click();
  //   expect(bottomPanalElt.openLink).toHaveBeenCalled();
  // });

  it('should cancel the bottom sheet when clicking on the overlay', () => {
    fixture.detectChanges();
    app.showBottomSheet();
    let bottomPanalElt = document.getElementById('bottom-panal');
    expect(bottomPanalElt).toBeTruthy();

    // BottomSheet overlay responds to click event.
    const overlayClass = 'cdk-overlay-backdrop';
    const overlay = document.getElementsByClassName(overlayClass)[0] as HTMLElement;
    overlay.click();
    fixture.detectChanges();

    // Bottom sheet needs time to be removed from screen.
    setTimeout(() => {
        bottomPanalElt = document.getElementById('bottom-panal');
        expect(bottomPanalElt).toBeFalsy();
    }, 1000);
  });

  it('should render menu items in the bottom sheet', () => {
      fixture.detectChanges();
      expect(document.getElementById('bottom-panel-item-1')).toBeFalsy();
      app.showBottomSheet();
      fixture.detectChanges();
      expect(document.getElementById('bottom-panel-item-1')).toBeTruthy();
  });
});
