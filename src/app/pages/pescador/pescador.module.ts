import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PescadorPageRoutingModule } from './pescador-routing.module';
import { PescadorPage } from './pescador.page';
import { ComponentsModule } from '../../components/components.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PescadorPageRoutingModule,
        ComponentsModule,
        IonicSelectableModule
    ],
    declarations: [PescadorPage]
})

export class PescadorPageModule { }