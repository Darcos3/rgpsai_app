import { Component, OnInit, NgZone } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Events } from 'src/app/config/events';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Preferences } from '@capacitor/preferences';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

    public loginForm: FormGroup;
    emailField: any; //"arojas@sanandres.gov.co";
    passField: any;  //"Temporal1829@!";
    userToken: any;

    constructor(
        private loadingController: LoadingController,
        private alertController: AlertController,
        public formBuilder: FormBuilder,
        private api: ApiRestService,
        private router: Router,
        private zone: NgZone,
        private events: Events
    ) {

        this.loginForm = formBuilder.group({
            emailField: [null, [
                Validators.required,
                Validators.email
            ]],
            passField: [null, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(15)
            ]]
        });    
    }

    async ngOnInit() {
        this.zone.run( () => {
            this.validateSession();
        });
    }

    async validateSession(){

        let data = await Preferences.get({ key: 'sessionPersistence' });
        let session = JSON.parse(data.value);

        if(session && session.sessionStatus==200){
            this.router.navigate(['registers']);
        }
    }

    //login auth
    async getLogin() {
        
        let object = Object();
        object.grant_type = 'password';
        object.client_id = 2;
        object.client_secret = 'mS5WmSWppoKIwewDs6P9JjVuWk0pebybYCyfA7Nf';
        object.username = this.emailField;
        object.password = this.passField;
        object.scope = 'general'; //externalApi

        const loading = await this.loadingController.create({
            message: 'Cargando...',
            spinner: 'crescent',
            showBackdrop: true,
        });

        await loading.present();
        
        this.api.getLogin(object).subscribe(response => {

            loading.dismiss();   
            
            ////console.log(response[0])
            if(response[0].access_token){

                let user = Object();
                user.token = response[0].access_token;
                user.email = this.emailField;
                user.userID = 1;

                this.userToken = response[0].access_token;
                this.api.setDataProfile(user, "Bearer " + response[0].access_token).subscribe(data => {
                    user.userID = data[0].user.id;
                }, err => {
                    //console.log('ErrorLogin', err);
                });

                this._storeKeysSession(user);
                this.downloadDropdowns();
                this.router.navigate(["registers"]);

            }else{
                this.presentError(response[0].success_message)
            }

        }, err => {
            this.presentError('Los datos de acceso estan errados, por favor verifique y vuelva a intentar.');
            //console.log('Error servicio: ', JSON.stringify(err));
            loading.dismiss();
        });
    }

    //store and create user session
    async _storeKeysSession(data){

        let session = Object();
        session.sessionStatus = 200;
        session.userToken = data.token;
        session.userEmail = data.email;
        session.userID = data.userID;
        
        await Preferences.set({
            key: 'sessionPersistence',
            value: JSON.stringify(session),
        });

        this.loginForm.reset();
    }

    //alert with warning
    async presentError(message) {

        const alert = await this.alertController.create({
            header: 'Advertencia',
            message: message,
            backdropDismiss: false,
            buttons: ['OK']
        });

        await alert.present();
    }

    //download all dropdowns
    async downloadDropdowns() {
        
        const loading = await this.loadingController.create({
            message: 'Cargando...',
            spinner: 'crescent',
            showBackdrop: true,
        });

        await loading.present();
        
        this.api.listDropdownPortsOfLanding("Bearer " + this.userToken).subscribe(response => {            
            //console.log('Landing', response[0]);
            this._storeKeysDropdowns('sessionSelectLanding', response[0]);
        }, err => {
            //console.log('Error servicio Landing: ', JSON.stringify(err));
        });

        this.api.listDropdownFishingArts("Bearer " + this.userToken).subscribe(response => {            
            //console.log('Fishing', response[0]);
            this._storeKeysDropdowns('sessionSelectFishing', response[0]);
        }, err => {
            //console.log('Error servicio Fishing: ', JSON.stringify(err));
        });

        this.api.listDropdownFishingArtsBoat("Bearer " + this.userToken).subscribe(response => {            
            //console.log('Fishing Boat', response[0]);
            this._storeKeysDropdowns('sessionSelectFishingBoats', response[0]);
        }, err => {
            //console.log('Error servicio Fishing Boat: ', JSON.stringify(err));
        });

        this.api.listDropdownRegistrationPorts("Bearer " + this.userToken).subscribe(response => {            
            //console.log('Ports', response[0]);
            this._storeKeysDropdowns('sessionSelectPorts', response[0]);
        }, err => {
            //console.log('Error servicio Ports: ', JSON.stringify(err));
        });

        this.api.listDropdownTypesOfFishery("Bearer " + this.userToken).subscribe(response => {            
            //console.log('Types of fishery', response[0]);
            this._storeKeysDropdowns('sessionSelectFisheries', response[0]);
        }, err => {
            //console.log('Error servicio Types of fishery: ', JSON.stringify(err));
        });

        this.api.listDropdownCompanies("Bearer " + this.userToken).subscribe(response => {            
            //console.log('Customers', response[0].data);
            this._storeKeysDropdowns('sessionSelectCustomers', response[0]);
        }, err => {
            //console.log('Error servicio Customers: ', JSON.stringify(err));
        });

        this.api.listDropdownOrganizations("Bearer " + this.userToken).subscribe(response => {            
            ////console.log('Organizations', response[0].data);
            this._storeKeysDropdowns('sessionSelectOrganizations', response[0]);
        }, err => {
            //console.log('Error servicio Organizations: ', JSON.stringify(err));
        });

        setTimeout(() => {
            loading.dismiss();
            this.presentMessage('Confirmación', 'Sincronización de valores completa');
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