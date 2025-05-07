import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ArtesanalsPage } from './artesanals.page';

describe('ArtesanalsPage', () => {
    let component: ArtesanalsPage;
    let fixture: ComponentFixture<ArtesanalsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ArtesanalsPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ArtesanalsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});