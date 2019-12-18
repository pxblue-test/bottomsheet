import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {AppModule} from './app.module';

describe('AppComponent', () => {

    let app: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [AppModule]
        });

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        spyOn(app, 'initializeApp').and.stub();

        // to increase the timeout and allow spec #3 and #4 pass
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    }));

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it('should call showBottomSheet() when clicking the top right icon', () => {
        fixture.detectChanges();
        const showBottomSheetSpy = spyOn(app, 'showBottomSheet').and.stub();
        const buttonElt = fixture.nativeElement.querySelector('.toolbar-button');
        buttonElt.click();
        expect(showBottomSheetSpy).toHaveBeenCalled();
    });

    it('should display the bottom sheet when clicking the top right icon', ( (done) => {
        
        fixture.detectChanges();
        app.showBottomSheet().afterOpened().subscribe(() => {
            const bottomSheet = document.getElementById('bottom-panel');
            expect(bottomSheet).toBeTruthy();
            done();
        });
    }));

    it('should render menu items in the bottom sheet', ((done) => {
        console.log(jasmine.DEFAULT_TIMEOUT_INTERVAL)
        fixture.detectChanges();
        app.showBottomSheet().afterOpened().subscribe(() => {
            const menuItem = document.getElementById('bottom-panel-item-1')
            expect(menuItem).toBeTruthy();
            done();
        });
    }));

    it('should call close bottom sheet when menu item is clicked', (done) => {
        fixture.detectChanges();
        const bottomSheetRef = app.showBottomSheet();
        bottomSheetRef.afterDismissed().subscribe(() => {
            const bottomSheet = document.getElementById('bottom-panel');
            expect(bottomSheet).toBeFalsy();
            done();
        });
        document.getElementById('bottom-panel-item-1').click();
    });

    it('should cancel the bottom sheet when clicking on the overlay', (done) => {
        fixture.detectChanges();
        const bottomSheetRef = app.showBottomSheet();
        bottomSheetRef.afterDismissed().subscribe(() => {
            const bottomSheet = document.getElementById('bottom-panel');
            expect(bottomSheet).toBeFalsy();
            done();
        });
        const overlayClass = 'cdk-overlay-backdrop';
        const overlay = document.getElementsByClassName(overlayClass)[0] as HTMLElement;
        overlay.click();
    });
});
