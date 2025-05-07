import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'registers',
        loadChildren: () => import('./pages/registers/registers.module').then(m => m.RegistersPageModule)
    },
    {
        path: 'industrials/:id',
        loadChildren: () => import('./pages/industrials/industrials.module').then( m => m.IndustrialsPageModule)
    },
    {
        path: 'industrials/detail/:id',
        loadChildren: () => import('./pages/industrials/detail/detail.module').then( m => m.DetailPageModule)
    },
    {
        path: 'artesanals/:id',
        loadChildren: () => import('./pages/artesanals/artesanals.module').then( m => m.ArtesanalsPageModule)
    },
    {
        path: 'artesanals/detail/:id',
        loadChildren: () => import('./pages/artesanals/detail/detail.module').then( m => m.DetailPageModule)
    },
    {
        path: 'pescador/:id',
        loadChildren: () => import('./pages/pescador/pescador.module').then( m => m.PescadorPageModule)
    },
    {
        path: 'pescador/detail/:id',
        loadChildren: () => import('./pages/pescador/detail/detail.module').then( m => m.DetailPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }