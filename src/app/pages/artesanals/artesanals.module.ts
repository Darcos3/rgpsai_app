import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ArtesanalsPageRoutingModule } from './artesanals-routing.module';
import { ArtesanalsPage } from './artesanals.page';
import { ComponentsModule } from '../../components/components.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ArtesanalsPageRoutingModule,
        IonicSelectableModule,
        ComponentsModule
    ],
    declarations: [ArtesanalsPage]
})

export class ArtesanalsPageModule { }