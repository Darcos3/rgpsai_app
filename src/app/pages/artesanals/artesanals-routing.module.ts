import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtesanalsPage } from './artesanals.page';

const routes: Routes = [
    {
        path: '',
        component: ArtesanalsPage
    },
    {
        path: 'detail',
        loadChildren: () => import('./detail/detail.module').then(m => m.DetailPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ArtesanalsPageRoutingModule { }