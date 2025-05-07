import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndustrialsPage } from './industrials.page';

const routes: Routes = [
    {
        path: '',
        component: IndustrialsPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class IndustrialsPageRoutingModule { }