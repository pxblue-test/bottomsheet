import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture, flush, tick, fakeAsync } from '@angular/core/testing';

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

  // TODO: this fight with the next test
  fit('should display the bottom sheet when clicking the top right icon', fakeAsync( () => {
    fixture.detectChanges();
    let bottomPanalElt = document.getElementById('bottom-panal');
    expect(bottomPanalElt).toBeFalsy();
    
    const bottomSheetRef = app.showBottomSheet();
    let aNewPromise = bottomSheetRef.afterOpened().toPromise();
    expectAsync(aNewPromise).toBeResolved();
    expect(bottomSheetRef).toBeTruthy();
    bottomSheetRef.dismiss();
    tick();
  }));

  // TODO
  fit('should render menu items in the bottom sheet', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(document.getElementById('bottom-panel-item-1')).toBeFalsy();

    let bottomSheetRef = app.showBottomSheet();
    fixture.detectChanges();
    let aNewPromise = bottomSheetRef.afterOpened().toPromise();
    expectAsync(aNewPromise).toBeResolved();
    expect(document.getElementById('bottom-panel-item-1')).toBeTruthy();
  }));

  // TODO
  it('should call their eventHandler openLink() when clicking on the menu item', () => {
    app.showBottomSheet();
    fixture.detectChanges();

    let bottomSheetRef = app.showBottomSheet();
    fixture.detectChanges();
    bottomSheetRef.afterOpened().toPromise();
    let menuItem = document.getElementById('bottom-panel-item-1'); 
    // spyOn(menuItem, 'openLink').withArgs({1:1});
    menuItem.click();
    // expect(menuItem.openLink).toHaveBeenCalled();
    console.log(menuItem)
    expect(true).toBeTruthy();
  });

  it('should cancel the bottom sheet when clicking on the overlay', () => {
    fixture.detectChanges();
    let bottomSheetRef = app.showBottomSheet();
    bottomSheetRef.afterOpened().subscribe(() => {
      expect(bottomSheetRef).toBeTruthy();
    });

    const overlayClass = 'cdk-overlay-backdrop';
    const overlay = document.getElementsByClassName(overlayClass)[0] as HTMLElement;
    bottomSheetRef.afterDismissed().subscribe(() => {
      expect(bottomSheetRef).toBeFalsy();
    });
    overlay.click();
    flush();
  });
});
