import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Events } from './config/events';
import { ApiRestService } from './services/api-rest.service';
import { Preferences } from '@capacitor/preferences';
import { Network } from '@capacitor/network';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})

export class AppComponent {

    sessionActive: boolean;
    selectedIndex: any;
    userID: any;
    userToken: any;
    
    constructor(
        private loadingController: LoadingController,
        private alertController: AlertController,
        private api: ApiRestService,
        private platform: Platform,
        private router: Router,
        private events: Events,
        private zone: NgZone
    ) {
        this.initializeApp();
    }

    async initializeApp() {
        console.log('Data -------- ', await Preferences.keys());
        console.log('Session', await Preferences.get({ key: 'sessionPersistence' }));
        // console.log('Landing', await Preferences.get({ key: 'sessionSelectLanding' }));
        // console.log('Fishing', await Preferences.get({ key: 'sessionSelectFishing' }));
        // console.log('Fishing Boats', await Preferences.get({ key: 'sessionSelectFishingBoats' }));
        // console.log('Ports', await Preferences.get({ key: 'sessionSelectPorts' }));
        // console.log('Fisheries', await Preferences.get({ key: 'sessionSelectFisheries' }));
        // console.log('Customers', await Preferences.get({ key: 'sessionSelectCustomers' }));
        // console.log('Organizations', await Preferences.get({ key: 'sessionSelectOrganizations' }));
        // console.log('Industrial Boats', await Preferences.get({ key: 'dataRegistersIndustrial' }));
        // console.log('Artesanal Boats', await Preferences.get({ key: 'dataRegistersArtesanal' }));
        // console.log('Pescadores', await Preferences.get({ key: 'dataRegistersPescadores' }));
        console.log('Data -------- END');
        this.platform.ready().then(() => {
            this.validateSession();
        });
    }

    async validateSession(){

        let dataSession = await Preferences.get({ key: 'sessionPersistence' });
        let session = JSON.parse(dataSession.value);

        if(session){
            
            if(session.userID){
                this.userID = session.userID;
            }

            if(session.userToken){
                this.userToken = session.userToken;
            }
            
            this.sessionActive = true;
        
        }else{
            this.sessionActive = false;
            this.router.navigate(['login']);
        }
    }

    //close sessión
    async closeSession() {

        if (this.sessionActive){

            const alert = await this.alertController.create({
                header: 'Confirmación',
                message: '¡Tu sesión fue cerrada exitosamente!',
                buttons: [{
                    text: 'Ok',
                    role: 'cancel',
                    handler: (blah) =>{
                        this.removeSession();
                    }
                }]
            });
            
            await alert.present();

        }else{
            this.router.navigate(["login"]);
        }
    }

    async removeSession(){
        await Preferences.remove({ key: 'sessionPersistence' }).then( () => {       
            Preferences.remove({ key: 'sessionSelectLanding' });
            Preferences.remove({ key: 'sessionSelectFishing' });
            Preferences.remove({ key: 'sessionSelectFishingBoats' });
            Preferences.remove({ key: 'sessionSelectPorts' });
            Preferences.remove({ key: 'sessionSelectFisheries' });
            Preferences.remove({ key: 'sessionSelectCustomers' });
            Preferences.remove({ key: 'sessionSelectOrganizations' });
            this.router.navigate(["login"]);
        });
    }

    //download all dropdowns
    async downloadDropdowns() {

        this.validateSession();

        const loading = await this.loadingController.create({
            message: 'Cargando...',
            spinner: 'crescent',
            showBackdrop: true,
        });

        await loading.present();
        
        this.api.listDropdownPortsOfLanding("Bearer " + this.userToken).subscribe(response => {            
            console.log('Landing', response[0]);
            this._storeKeysDropdowns('sessionSelectLanding', response[0]);
        }, err => {
            //this.presentMessage('Advertencia', 'No podemos establecer conexión con el servidor, por favor cierre y vuelva a iniciar sesión e intente de nuevo');
            console.log('Error servicio Landing: ', JSON.stringify(err));
        });

        this.api.listDropdownFishingArts("Bearer " + this.userToken).subscribe(response => {            
            console.log('Fishing', response[0]);
            this._storeKeysDropdowns('sessionSelectFishing', response[0]);
        }, err => {
            console.log('Error servicio Fishing: ', JSON.stringify(err));
        });

        this.api.listDropdownFishingArtsBoat("Bearer " + this.userToken).subscribe(response => {            
            console.log('Fishing Boat', response[0]);
            this._storeKeysDropdowns('sessionSelectFishingBoats', response[0]);
        }, err => {
            console.log('Error servicio Fishing Boat: ', JSON.stringify(err));
        });

        this.api.listDropdownRegistrationPorts("Bearer " + this.userToken).subscribe(response => {            
            console.log('Ports', response[0]);
            this._storeKeysDropdowns('sessionSelectPorts', response[0]);
        }, err => {
            console.log('Error servicio Ports: ', JSON.stringify(err));
        });

        this.api.listDropdownTypesOfFishery("Bearer " + this.userToken).subscribe(response => {            
            console.log('Types of fishery', response[0]);
            this._storeKeysDropdowns('sessionSelectFisheries', response[0]);
        }, err => {
            console.log('Error servicio Types of fishery: ', JSON.stringify(err));
        });

        this.api.listDropdownCompanies("Bearer " + this.userToken).subscribe(response => {            
            console.log('Customers', response[0].data);
            this._storeKeysDropdowns('sessionSelectCustomers', response[0]);
        }, err => {
            console.log('Error servicio Customers: ', JSON.stringify(err));
        });

        this.api.listDropdownOrganizations("Bearer " + this.userToken).subscribe(response => {            
            console.log('Organizations', response[0]);
            this._storeKeysDropdowns('sessionSelectOrganizations', response[0]);
        }, err => {
            console.log('Error servicio Organizations: ', JSON.stringify(err));
        });

        setTimeout(() => {
            loading.dismiss();
            
            const logCurrentNetworkStatus = async () => {
                const status = await Network.getStatus();
                
                if(status.connected === true){
                    this.presentMessage('Confirmación', 'Sincronización de valores completa');
                }else{
                    this.presentMessage('Advertencia', 'No cuentas con conexión a internet, intenta más tarde.');
                }
            };
    
            logCurrentNetworkStatus();
            
        }, 500);
    }

    //store and session dropdowns
    async _storeKeysDropdowns(keyName, data){

        let session = Object();
        session.data = data;
        
        await Preferences.set({
            key: keyName,
            value: JSON.stringify(session),
        });
    }

    //alert with warning
    async presentMessage(title, message) {

        const alert = await this.alertController.create({
            header: title,
            message: message,
            backdropDismiss: false,
            buttons: ['OK']
        });

        await alert.present();
    }
}