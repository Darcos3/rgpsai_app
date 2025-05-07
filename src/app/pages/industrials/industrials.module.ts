import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IndustrialsPageRoutingModule } from './industrials-routing.module';
import { IndustrialsPage } from './industrials.page';
import { ComponentsModule } from '../../components/components.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IndustrialsPageRoutingModule,
        ComponentsModule,
        IonicSelectableModule
    ],
    declarations: [IndustrialsPage]
})

export class IndustrialsPageModule { }