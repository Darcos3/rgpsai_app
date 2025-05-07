import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PescadorPage } from './pescador.page';

const routes: Routes = [
    {
        path: '',
        component: PescadorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class PescadorPageRoutingModule { }