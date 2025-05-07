import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../components/menu/menu.component';

@NgModule({
    declarations: [
        MenuComponent,
    ],
    imports: [
        IonicModule,
        CommonModule,
    ],
    exports: [
        MenuComponent,
    ],
})

export class ComponentsModule {}