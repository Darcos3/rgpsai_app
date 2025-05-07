import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
selector: 'app-menu',
templateUrl: './menu.component.html',
styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {

    @Input("TitleBar") TitleBar;
    @Input("isMenuVisible") isMenuVisible;
    @Input("isBackVisible") isBackVisible;
    @Input("isFilterVisible") isFilterVisible;
    @Input("isBackItemVisible") isBackItemVisible;
    @Input("isCloseVisible") isCloseVisible;

    constructor(
        private alertController: AlertController,
        private router: Router
    ) { }

    ngOnInit() { }

    async closeView(){

        const alert = await this.alertController.create({
            header: 'Confirmación',
            message: '¿Desea salir de esta vista?<br> Si lo hace perdera los avances que tenga en el formulario',
            backdropDismiss: false,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Si',
                    handler: () => {
                        this.router.navigate(['registers']);
                    }
                }
            ]
        });
    
        await alert.present();
    }
}