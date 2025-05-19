import { Component, OnInit } from '@angular/core';
import {
    LocationsMunicipios,
    CertificacionExpedida,
    Countries,
    TipoEmbarcacionArtesanal,
    TiposPesqueria,
    ArtesPescaPescadores,
    DocumentoAcredita,
    Genero,
    EstadoCivil,
    NivelEducativo,
    ServicioSalud,
    TiempoPesca,
    Dedicacion,
    HorarioPesca
} from '../../config/data';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/config/events';
import { Network } from '@capacitor/network';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
    selector: 'app-pescador',
    templateUrl: './pescador.page.html',
    styleUrls: ['./pescador.page.scss'],
})

export class PescadorPage implements OnInit {

    constructor(
        private loadingController: LoadingController,
        private alertController: AlertController,
        private activatedRoute: ActivatedRoute,
        private api: ApiRestService,
        private router: Router,
        private events: Events
    ) { }

    public dataStorage: any[] = [];

    //dropdowns
    lugares: any;
    certificaciones: any;
    paises: any;
    empresas: any;

    countries: any;
    portsRegister: any;
    shipTypes: any;
    unityPotences: any;
    materialsCasco: any;
    conservationFish: any;
    denominacionesAnzuelo: any;
    tiposAnzuelos: any;
    materialesLineaMadre: any;
    mateterialesBajantes: any;
    denomincacionArtesPesca: any;
    materialPpalTrampa: any;
    tiposDeArtefacto: any;
    materialesArtefacto: any;
    booleans: any;
    tiposFads: any;
    dembarquePorts: any;
    artesPesca: any;
    tiposPesqueria: any;
    tipoEmbarcacionArnal: any;
    documentoAcredita: any;
    genres: any;
    maritalStates: any;
    educationLevels: any;
    servicesHealt: any;
    timePesca: any;
    dedicationDrop: any;
    horarioPesca: any;

    //############################### VARS
    //is new or old register
    id: any = this.activatedRoute.snapshot.paramMap.get('id');
    //tabs
    actualTab: number = this.id == 0 ? 0 : 1;
    counter: number = this.id == 0 ? 0 : 1;
    tab0: number = 0;
    tab1: number = 0;
    tab2: number = 0;
    tab3: number = 0;
    tab4: number = 0;
    tab5: number = 0;
    tab6: number = 0;
    tab7: number = 0;
    //generals
    userToken: any;
    userID: any;
    update_date: any;
    status: any;
    //tab 0
    searchPesca: any;
    cedula_search: any = '';
    //tab 1
    department: any;
    filed: any;
    filing_date: any;
    //tab 2
    copy_identification_document: any;
    copy_occre: any;
    copy_sisben: any;
    accreditation_certificate: any;
    certification_issued_by: any;
    vigencia_permiso: any;
    expedition_date: any;
    expiration_date: any;
    //tab 3
    photo: any;
    name: any;
    lastname: any;
    type_of_card: any;
    identification_number: any;
    occre: any;
    no_occre: any;
    nationality: any;
    email: any;
    address: any;
    phone: any;
    organization_cooperative: any;
    organization_name: any;
    //tab 4
    dembarque_port: any;
    zona_frecuente_pesca: any;
    tipo_embarcacion_artesanal: any;
    otro_tipo_embarcacion_artesanal: any;
    tipo_pesqueria: any;
    artes_pesca: any;
    //tab 5
    reporta_embarcacion: any;
    propietario_embarcacion: any;
    documento_acredita: any;
    data_boats: any = [];
    search_vessel_field: any;
    //tab six
    birthdate: any;
    age: any;
    genre: any;
    marital_state: any;
    otro_marital_state: any;
    read_write: any;
    education_level: any;
    otro_education_level: any;
    own_home: any;
    healt_service: any;
    otro_healt_service: any;
    pesca_time: any;
    otro_pesca_time: any;
    dedication: any;
    hour_pesca: any;
    //tab seven
    observations: any;
    emailValidate: boolean = true;

    buscado: boolean = false;
    certificacion_id: any = null;
    certificacion_name: any = null;

    empresaSubscription;
    boatId:any = null;

    ngOnInit() {
        this.validateSession();
        this.lugares = LocationsMunicipios;

        // console.log(this.lugares)

        this.certificaciones = CertificacionExpedida;
        this.paises = Countries;
        this.tipoEmbarcacionArnal = TipoEmbarcacionArtesanal;
        this.tiposPesqueria = TiposPesqueria;
        this.artesPesca = ArtesPescaPescadores;
        this.documentoAcredita = DocumentoAcredita;

        this.genres = Genero;
        this.maritalStates = EstadoCivil;
        this.educationLevels = NivelEducativo;
        this.servicesHealt = ServicioSalud;
        this.timePesca = TiempoPesca;
        this.dedicationDrop = Dedicacion;
        this.horarioPesca = HorarioPesca;

        if (this.id != 0) {
            this.loadData();
        }
    }

    async validateSession() {

        let dataSession = await Preferences.get({ key: 'sessionPersistence' });
        let session = JSON.parse(dataSession.value);

        if (session) {

            if (session.userID) {
                this.userID = session.userID;
            }

            if (session.userToken) {
                this.userToken = session.userToken;
            }

        } else {
            this.router.navigate(['login']);
        }

        let dataRegisters = await Preferences.get({ key: 'dataRegistersPescadores' });
        let sessionRegisters = JSON.parse(dataRegisters.value);

        if (this.id == 0 && sessionRegisters && sessionRegisters.length >= 10) {
            this.presentMessage('Advertencia', 'No podrás registrar más inspecciones a menos que subas una de las que tienes en el listado, solo se permite tenér un máximo de 10 registros por listado.', true);
        }

        this.dataStorage = sessionRegisters ? sessionRegisters : [];

        //dropdowns
        let ddC = await Preferences.get({ key: 'sessionSelectOrganizations' });
        let sC = JSON.parse(ddC.value);
        let ddSf = await Preferences.get({ key: 'sessionSelectLanding' });
        let sSf = JSON.parse(ddSf.value);
        let ddP = await Preferences.get({ key: 'sessionSelectPorts' });
        let sP = JSON.parse(ddP.value);
        // this.empresas = sC.data;
        this.empresas = await CertificacionExpedida;
        this.dembarquePorts = sSf.data;
        this.portsRegister = sP.data;

        //add declaración juramentada
        // this.empresas.push({
        //     id: null,
        //     name: 'Declaración Juramentada'
        // });

        console.log("empresas ", this.empresas)
    }

    antTab() {

        this.counter--;

        if (this.counter == 0) {
            this.actualTab = 0;
            this.tab0 = 0;
            this.tab1 = 0;
            this.tab2 = 0;
            this.tab3 = 0;
            this.tab4 = 0;
            this.tab5 = 0;
            this.tab6 = 0;
            this.tab7 = 0;
        } else if (this.counter == 1) {
            this.actualTab = 1;
            this.tab0 = 1;
            this.tab1 = 0;
            this.tab2 = 0;
            this.tab3 = 0;
            this.tab4 = 0;
            this.tab5 = 0;
            this.tab6 = 0;
            this.tab7 = 0;
        } else if (this.counter == 2) {
            this.actualTab = 2;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 0;
            this.tab3 = 0;
            this.tab4 = 0;
            this.tab5 = 0;
            this.tab6 = 0;
            this.tab7 = 0;
        } else if (this.counter == 3) {
            this.actualTab = 3;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 1;
            this.tab3 = 0;
            this.tab4 = 0;
            this.tab5 = 0;
            this.tab6 = 0;
            this.tab7 = 0;
        } else if (this.counter == 4) {
            this.actualTab = 4;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 1;
            this.tab3 = 1;
            this.tab4 = 0;
            this.tab5 = 0;
            this.tab6 = 0;
            this.tab7 = 0;
        } else if (this.counter == 5) {
            this.actualTab = 5;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 1;
            this.tab3 = 1;
            this.tab4 = 1;
            this.tab5 = 0;
            this.tab6 = 0;
            this.tab7 = 0;
        } else if (this.counter == 6) {
            this.actualTab = 6;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 1;
            this.tab3 = 1;
            this.tab4 = 1;
            this.tab5 = 1;
            this.tab6 = 0;
            this.tab7 = 0;
        } else if (this.counter == 7) {
            this.actualTab = 7;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 1;
            this.tab3 = 1;
            this.tab4 = 1;
            this.tab5 = 1;
            this.tab6 = 1;
            this.tab7 = 0;
        }

        console.log('Data...', this.actualTab)
    }

    nextTab() {

        if (this.counter == 0) {
            this.actualTab = 1;
            this.tab0 = 1;
        } else if (this.counter == 1) {
            this.actualTab = 2;
            this.tab1 = 1;
        } else if (this.counter == 2) {
            this.actualTab = 3;
            this.tab2 = 1;
        } else if (this.counter == 3) {
            this.actualTab = 4;
            this.tab3 = 1;
        } else if (this.counter == 4) {
            this.actualTab = 5;
            this.tab4 = 1;
        } else if (this.counter == 5) {
            this.actualTab = 6;
            this.tab5 = 1;
        } else if (this.counter == 6) {
            this.actualTab = 7;
            this.tab6 = 1;
        } else if (this.counter == 7) {
            this.actualTab = 8;
            this.tab7 = 1;
        }
        this.counter++;
    }

    //validate fields
    numberValidator(event: any) {
        //console.log(event.target.value);
        const pattern = /^[0-9 -]*$/;
        //let inputChar = String.fromCharCode(event.charCode)
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^0-9 -]/g, "");
            // invalid character, prevent input
        }
    }

    //validate email
    validarEmail(event) {
        let email = event.detail.value;
        if (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email)) {
            this.emailValidate = true;
            return true;
        } else {
            if (email == '') {
                this.emailValidate = true;
            } else {
                this.emailValidate = false;
            }
            return false;
        }
    }

    //search validate
    validateSearch() {

        if (this.cedula_search.length < 4) {
            this.presentMessage('Advertencia', 'Debe envíar un número de cédula valido');
            return;
        }

        const logCurrentNetworkStatus = async () => {

            const status = await Network.getStatus();
            //console.log(status);

            if (status.connected === true) {

                this.searchPescador();

            } else {
                this.searchPesca = true;
                this.presentMessage('Advertencia', 'No es posible realizar la búsqueda, conéctese a internet o realice un nuevo registro');
            }
        };

        logCurrentNetworkStatus();
    }

    setVal() {
        console.log(this.department);
    }

    //search pescador
    async searchPescador() {

        this.searchPesca = true;

        const loading = await this.loadingController.create({
            message: 'Cargando...',
            spinner: 'crescent',
            showBackdrop: true,
        });

        await loading.present();

        this.api.searchPescador("Bearer " + this.userToken, this.cedula_search).subscribe(response => {
            console.warn(response);
            loading.dismiss();
            if (response[0] && response[0].data && response[0].data.data && response[0].data.data[0]) {

                let tfArray = [];
                if (response[0].data.data[0].type_fishery && response[0].data.data[0].type_fishery.length > 0) {
                    response[0].data.data[0].type_fishery.map(data => {
                        tfArray.push(`${data.id}`);
                    });
                }

                let apArray = []; //artes de pesca
                if (response[0].data.data[0].fishing_arts && response[0].data.data[0].fishing_arts.length > 0) {
                    response[0].data.data[0].fishing_arts.map(data => {
                        apArray.push(`${data.id}`);
                    });
                }

                let boatsArray = []; //boats
                if (response[0].data.data[0].boats && response[0].data.data[0].boats.length > 0) {
                    response[0].data.data[0].boats.map(data => {
                        boatsArray.push({
                            id: data.id,
                            nombre: data.nombre,
                            registration_number: data.registration_number,
                        });
                    });
                }
                this.boatId = response[0].data.data[0].id;
                this.department = this.lugares.find(({ codigo }) => codigo === response[0].data.data[0].department);
                this.filed = response[0].data.data[0].filed;
                this.filing_date = response[0].data.data[0].filing_date;
                //tab 2
                this.copy_identification_document = response[0].data.data[0].copy_identification_document;
                this.copy_occre = response[0].data.data[0].copy_occre;
                this.copy_sisben = response[0].data.data[0].copy_sisben;
                this.accreditation_certificate = response[0].data.data[0].accreditation_certificate;
                this.certification_issued_by = this.empresas.find(({ id }) => id == response[0].data.data[0].certification_issued_by);
                

                // this.vigencia_permiso = response[0].data.data[0].vigencia_permiso; 
                let vig:any = Object.values(response[0].data.data[0]);
                // console.log('vige : '+  )
                this.vigencia_permiso = JSON.stringify(vig[0]); 

                this.expedition_date = response[0].data.data[0].expedition_date;
                this.expiration_date = response[0].data.data[0].expiration_date;
                //tab 3
                this.photo = response[0].data.data[0].fisherman_photo_file;
                this.name = response[0].data.data[0].name;
                this.lastname = response[0].data.data[0].lastname;
                this.type_of_card = response[0].data.data[0].type_of_card;
                this.identification_number = response[0].data.data[0].identification_number;
                this.occre = response[0].data.data[0].occre;
                this.no_occre = response[0].data.data[0].no_occre;
                this.nationality = this.paises.find(({ codigo }) => codigo == response[0].data.data[0].nationality);
                this.email = response[0].data.data[0].email;
                this.address = response[0].data.data[0].address;
                this.phone = response[0].data.data[0].phone;
                this.organization_cooperative = response[0].data.data[0].organization_cooperative;
                console.log('OC -->', this.organization_cooperative)

                this.organization_name = this.empresas.find(({ id }) => id == response[0].data.data[0].organization_name);

                //tab 4
                this.dembarque_port = this.dembarquePorts.find(({ codigo }) => codigo == response[0].data.data[0].landing_zone);
                this.zona_frecuente_pesca = response[0].data.data[0].frequent_fishing_area;
                this.tipo_embarcacion_artesanal = response[0].data.data[0].type_of_artesanal_boat;
                this.otro_tipo_embarcacion_artesanal = response[0].data.data[0].type_of_artesanal_boat_state;
                this.tipo_pesqueria = tfArray;
                this.artes_pesca = apArray;
                //tab 5
                this.reporta_embarcacion = response[0].data.data[0].report_boat;
                this.propietario_embarcacion = response[0].data.data[0].owns_boat;
                this.documento_acredita = null;//response[0].data.data[0].documento_acredita;
                this.data_boats = boatsArray;

                //tab 6
                this.birthdate = response[0].data.data[0].birth_date;

                let ndate = new Date(this.birthdate);
                let hoy:any = new Date();
                this.age = hoy.getFullYear() - ndate.getFullYear();

                this.genre = response[0].data.data[0].gender;
                this.marital_state = response[0].data.data[0].marital_status;
                this.otro_marital_state = response[0].data.data[0].material_status_state;
                this.read_write = response[0].data.data[0].read_and_write;
                this.education_level = response[0].data.data[0].education_level;
                this.otro_education_level = response[0].data.data[0].otro_education_level;
                this.own_home = response[0].data.data[0].own_house;
                this.healt_service = response[0].data.data[0].type_health_service;
                this.otro_healt_service = response[0].data.data[0].type_health_service_state;
                this.pesca_time = response[0].data.data[0].fishing_time;
                this.otro_pesca_time = response[0].data.data[0].fishing_time_state;
                this.dedication = response[0].data.data[0].tiempo_en_actividad.codigo;
                this.hour_pesca = response[0].data.data[0].fishing_schedule;
                //tab 7
                // this.observations = response[0].data.data[0].observations;     
                this.observations = '';

                this.presentMessage('Resultado exitoso', 'REGISTRO ENCONTRADO');

            } else {
                this.presentMessage('Advertencia', 'REGISTRO NO ENCONTRADO');
            }

        }, err => {
            loading.dismiss();
            this.presentMessage('Advertencia', 'No podemos establecer conexión con el servidor, por favor cierre y vuelva a iniciar sesión e intente de nuevo');
        });
    }

    //alert with warning
    async presentMessage(title, message, redirect: boolean = false) {

        const alert = await this.alertController.create({
            header: title,
            message: message,
            backdropDismiss: false,
            buttons: [
                {
                    text: 'OK',
                    handler: () => redirect ? this.router.navigate(['registers']) : null
                }
            ]
        });

        await alert.present();
    }

    selectCertExp(event: {
        component: IonicSelectableComponent,
        value: any
      }) {
        let id = event.value.id;
        // console.log(id)
        if( id === null){
            this.organization_cooperative = 'NO';
            this.organization_name = {"id":"1031","name":"INDEPENDIENTE SAI"};
        } else {
            this.organization_name = {"id":"1032","name":"INDEPENDIENTE PROV"};
        }
      }

    //select value radio
    selectedRadio(type, event) {
        if (type == 1) {
            this.copy_identification_document = event.detail.value;
        } else if (type == 2) {
            this.copy_occre = event.detail.value;
        } else if (type == 3) {
            this.copy_sisben = event.detail.value;
        } else if (type == 4) {
            this.accreditation_certificate = event.detail.value;
        } else if (type == 5) {
            this.occre = event.detail.value;
        } else if (type == 6) {
            this.organization_cooperative = event.detail.value;
            this.assignedOrganizationValue(event.detail.value);
        } else if (type == 7) {
            this.reporta_embarcacion = event.detail.value;
        } else if (type == 8) {
            this.propietario_embarcacion = event.detail.value;
        } else if (type == 9) {
            this.read_write = event.detail.value;
        } else if (type == 10) {
            this.own_home = event.detail.value;
        }
    }

    //update expiration date
    updateExpiration(type) {

        if (type == 1) {

            if (this.vigencia_permiso && this.expedition_date) {
                this.addDays(1, Number(this.vigencia_permiso));
            }
        }
    }

    //add days to date
    addDays(type, n) {

        if (type == 1) {
            let dat = new Date(this.expedition_date);
            let startDate = new Date(dat);
            let requiredDate = new Date(startDate.getFullYear() + n, startDate.getMonth(), startDate.getDate());
            this.expiration_date = requiredDate.toISOString().substring(0, 10);
        }
    }

    //open gallery and take a photo
    uPloadNewPhoto = async () => {
        await Camera.checkPermissions();
        const image = await Camera.getPhoto({
            quality: 95,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            //width: 512,
            //height: 512,
            correctOrientation: true,
            promptLabelPhoto: 'Biblioteca de imágenes',
            promptLabelPicture: 'Tomar una foto',
            promptLabelHeader: 'Embarcación Imágenes',
            promptLabelCancel: 'Cancelar'
        });

        var imageUrl = image.base64String;
        this.photo = 'data:image/jpeg;base64,' + imageUrl;
    }

    // on change cert by
    filterEmpresas(text: string) {

        let emps = Object.values(this.empresas);
        let outs = [];
        // let data = [];
        // emps.filter(function(it:any) {
        //     let name = JSON.stringify(it.name);
        //     outs.push(it)
        // });

        let resp = emps.find((e:any) => e.name === text )
        console.log(resp)
        outs.push(resp)
        return outs;
        
        // console.log(outs)
        // return outs;

        // const elem = emps.find((e:any) => e);
        // // if( elem != undefined ){
        //     outs.push(elem)
        //     // }
        //     console.log(outs)
        //     return outs;
    }
    
    onChangeCert(event: {
        component: IonicSelectableComponent,
        text: any
    }) {
        let text = event.text.trim().toLowerCase();

        if (this.empresaSubscription) {
            this.empresaSubscription.unsubscribe();
          }
      
          if (!text) {
            // Close any running subscription.
            if (this.empresaSubscription) {
              this.empresaSubscription.unsubscribe();
            }
      
            event.component.items = [];
            event.component.endSearch();
            return;
          }
      
        event.component.items = this.filterEmpresas(text);
        event.component.endSearch();
        // if(event.value.id == null){
        //     this.organization_cooperative = 'NO';
        //     if(this.department && this.department.codigo=='UNO'){
        //         this.organization_name = {"id":"1031","name":"INDEPENDIENTE SAI"};
        //     }else if(this.department && this.department.codigo=='DOS'){
        //         this.organization_name = {"id":"1032","name":"INDEPENDIENTE PROV"};
        //     }
        // }
    }

    assignedOrganizationValue(selection) {
        if (selection == 'NO') {
            if (this.department && this.department.codigo == 'UNO') {
                this.organization_name = { "id": "1031", "name": "INDEPENDIENTE SAI" };
            } else if (this.department && this.department.codigo == 'DOS') {
                this.organization_name = { "id": "1032", "name": "INDEPENDIENTE PROV" };
            }
        }
    }

    //search vessel
    async searchVessel() {

        const loading = await this.loadingController.create({
            message: 'Cargando...',
            spinner: 'crescent',
            showBackdrop: true,
        });

        await loading.present();

        this.api.searchVessel("Bearer " + this.userToken, this.search_vessel_field + "/art").subscribe(response => {
            loading.dismiss();

            if (response[0] && response[0].data && response[0].data[0]) {

                // var result = this.data_boats.find(item => item.registration_number === this.search_vessel_field);
                var result = this.data_boats.find(item => item.registration_number === this.search_vessel_field);

                if (!result) {
                    // boat_request_id: response[0].data[0].id,
                    // propietario: this.propietario_embarcacion,
                    // tipo_certificado: this.documento_acredita.description,
                    this.data_boats.push({
                        boat_request_id: response[0].data[0].numero_matricula,
                        propietario: response[0].data[0].nombre_propietario,
                        tipo_certificado: response[0].data[0].tipo_identificacion,
                        nombre: response[0].data[0].nombre_barco
                    });
                    this.search_vessel_field = '';
                }

                console.log('response[0].data[0] ', response[0].data[0]);
                // console.log('result =>', result);
                // console.log('data_boats =>', this.data_boats);

            } else {
                this.presentMessage('Advertencia', 'REGISTRO NO ENCONTRADO');
            }

        }, err => {
            loading.dismiss();
            this.presentMessage('Advertencia', 'No podemos establecer conexión con el servidor, por favor cierre y vuelva a iniciar sesión e intente de nuevo');
        });
    }

    async deleteVesselAsociate(vessel) {
        let items = this.data_boats.filter((item) => {
            return item.registration_number === vessel;
        });


        items.forEach((element) => {
            var index = this.data_boats.indexOf(element);
            this.data_boats.splice(index, 1)
        });
    }

    calculateAge() {
        var birthDate = this.birthdate;
        let currentTime = new Date().getTime();
        let birthDateTime = new Date(birthDate).getTime();
        let difference = (currentTime - birthDateTime);
        var ageInYears = Number(difference / (1000 * 60 * 60 * 24 * 365));
        this.age = Math.round(ageInYears);
    }

    //storage in local
    async saveInLocal() {

        if (this.id == 0) {

            let object = Object();
            object.boatId = this.boatId;
            object.id = Math.random().toString(36).substr(2, 9);
            object.update_date = new Date().toLocaleDateString();
            object.status = 1;
            //tab 0
            object.searchPesca = this.searchPesca;
            object.cedula_search = this.cedula_search;
            //tab 1
            object.department = this.department;
            object.filed = this.filed;
            object.filing_date = this.filing_date;
            //tab 2
            object.copy_identification_document = this.copy_identification_document;
            object.copy_occre = this.copy_occre;
            object.copy_sisben = this.copy_sisben;
            object.accreditation_certificate = this.accreditation_certificate;
            object.certification_issued_by = this.certification_issued_by;
            object.vigencia_permiso = this.vigencia_permiso;
            object.expedition_date = this.expedition_date;
            object.expiration_date = this.expiration_date;
            //tab 3
            object.photo = this.photo;
            object.name = this.name;
            object.lastname = this.lastname;
            object.type_of_card = this.type_of_card;
            object.identification_number = this.identification_number;
            object.occre = this.occre;
            object.no_occre = this.no_occre;
            object.nationality = this.nationality;
            object.email = this.email;
            object.address = this.address;
            object.phone = this.phone;
            object.organization_cooperative = this.organization_cooperative;
            object.organization_name = this.organization_name;
            //tab 4
            object.dembarque_port = this.dembarque_port;
            object.zona_frecuente_pesca = this.zona_frecuente_pesca;
            object.tipo_embarcacion_artesanal = this.tipo_embarcacion_artesanal;
            object.otro_tipo_embarcacion_artesanal = this.otro_tipo_embarcacion_artesanal;
            object.tipo_pesqueria = this.tipo_pesqueria;
            object.artes_pesca = this.artes_pesca;
            //tab 5
            object.reporta_embarcacion = this.reporta_embarcacion;
            object.propietario_embarcacion = this.propietario_embarcacion;
            object.documento_acredita = this.documento_acredita;
            object.data_boats = this.data_boats;
            object.search_vessel_field = this.search_vessel_field;
            //tab 6
            object.birthdate = this.birthdate;
            object.age = this.age;
            object.genre = this.genre;
            object.marital_state = this.marital_state;
            object.otro_marital_state = this.otro_marital_state;
            object.read_write = this.read_write;
            object.education_level = this.education_level;
            object.otro_education_level = this.otro_education_level;
            object.own_home = this.own_home;
            object.healt_service = this.healt_service;
            object.otro_healt_service = this.otro_healt_service;
            object.pesca_time = this.pesca_time;
            object.otro_pesca_time = this.otro_pesca_time;
            object.dedication = this.dedication;
            object.hour_pesca = this.hour_pesca;
            //tab 7
            object.observations = this.observations;
            this.dataStorage.push(object);

        } else {

            let items = this.dataStorage.filter((item) => {
                return item.id === this.id;
            });

            items.forEach((data) => {
                data.update_date = new Date().toLocaleDateString();
                data.status = 1;
                //tab 0
                data.searchPesca = this.searchPesca;
                data.cedula_search = this.cedula_search;
                //tab 1
                data.department = this.department;
                data.filed = this.filed;
                data.filing_date = this.filing_date;
                //tab 2
                data.copy_identification_document = this.copy_identification_document;
                data.copy_occre = this.copy_occre;
                data.copy_sisben = this.copy_sisben;
                data.accreditation_certificate = this.accreditation_certificate;
                data.certification_issued_by = this.certification_issued_by;
                data.vigencia_permiso = this.vigencia_permiso;
                data.expedition_date = this.expedition_date;
                data.expiration_date = this.expiration_date;
                //tab 3
                data.photo = this.photo;
                data.name = this.name;
                data.lastname = this.lastname;
                data.type_of_card = this.type_of_card;
                data.identification_number = this.identification_number;
                data.occre = this.occre;
                data.no_occre = this.no_occre;
                data.nationality = this.nationality;
                data.email = this.email;
                data.address = this.address;
                data.phone = this.phone;
                data.organization_cooperative = this.organization_cooperative;
                data.organization_name = this.organization_name;
                //tab 4
                data.dembarque_port = this.dembarque_port;
                data.zona_frecuente_pesca = this.zona_frecuente_pesca;
                data.tipo_embarcacion_artesanal = this.tipo_embarcacion_artesanal;
                data.otro_tipo_embarcacion_artesanal = this.otro_tipo_embarcacion_artesanal;
                data.tipo_pesqueria = this.tipo_pesqueria;
                data.artes_pesca = this.artes_pesca;
                //tab 5
                data.reporta_embarcacion = this.reporta_embarcacion;
                data.propietario_embarcacion = this.propietario_embarcacion;
                data.documento_acredita = this.documento_acredita;
                data.this_boats = this.data_boats;
                data.search_vessel_field = this.search_vessel_field;
                //tab 6
                data.birthdate = this.birthdate;
                data.age = this.age;
                data.genre = this.genre;
                data.marital_state = this.marital_state;
                data.otro_marital_state = this.otro_marital_state;
                data.read_write = this.read_write;
                data.education_level = this.education_level;
                data.otro_education_level = this.otro_education_level;
                data.own_home = this.own_home;
                data.healt_service = this.healt_service;
                data.otro_healt_service = this.otro_healt_service;
                data.pesca_time = this.pesca_time;
                data.otro_pesca_time = this.otro_pesca_time;
                data.dedication = this.dedication;
                data.hour_pesca = this.hour_pesca;
                //tab 7
                data.observations = this.observations;
            });
        }

        await Preferences.set({
            key: 'dataRegistersPescadores',
            value: JSON.stringify(this.dataStorage),
        }).then(() => {
            this.AlertStore();
            console.log(this.dataStorage)
        });
    }

    //uplad register server
    async AlertStore() {

        const alert = await this.alertController.create({
            header: 'Confirmación',
            message: 'Datos almacenados exitosamente',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.actualTab = this.id == 0 ? 0 : 1;
                        this.counter = this.id == 0 ? 0 : 1;
                        this.searchPesca = false;
                        this.cedula_search = null;
                        this.events.publish('updateRegisters', []);
                        this.router.navigate(["registers"]);
                    }
                }
            ]
        });

        await alert.present();
    }

    //load data persistence
    async loadData() {

        let dataRegister = await Preferences.get({ key: 'dataRegistersPescadores' });
        let response = JSON.parse(dataRegister.value);
        this.dataStorage = response;

        let items = this.dataStorage.filter((item) => {
            return item.id === this.id;
        });

        //console.log('Registro: ', items)
        items.forEach((data) => {
            //tab 0
            this.searchPesca = data.searchPesca;
            this.cedula_search = data.cedula_search;
            //tab 1
            this.department = data.department;
            this.filed = data.filed;
            this.filing_date = data.filing_date;
            //tab 2
            this.copy_identification_document = data.copy_identification_document;
            this.copy_occre = data.copy_occre;
            this.copy_sisben = data.copy_sisben;
            this.accreditation_certificate = data.accreditation_certificate;
            this.certification_issued_by = data.certification_issued_by;
            this.vigencia_permiso = data.vigencia_permiso;
            this.expedition_date = data.expedition_date;
            this.expiration_date = data.expiration_date;
            //tab 3
            this.photo = data.photo;
            this.name = data.name;
            this.lastname = data.lastname;
            this.type_of_card = data.type_of_card;
            this.identification_number = data.identification_number;
            this.occre = data.occre;
            this.no_occre = data.no_occre;
            this.nationality = data.nationality;
            this.email = data.email;
            this.address = data.address;
            this.phone = data.phone;

            this.organization_name = data.organization_name;
            //tab 4
            this.dembarque_port = data.dembarque_port;
            this.zona_frecuente_pesca = data.zona_frecuente_pesca;
            this.tipo_embarcacion_artesanal = data.tipo_embarcacion_artesanal;
            this.otro_tipo_embarcacion_artesanal = data.otro_tipo_embarcacion_artesanal;
            this.tipo_pesqueria = data.tipo_pesqueria;
            this.artes_pesca = data.artes_pesca;
            //tab 5
            this.reporta_embarcacion = data.reporta_embarcacion;
            this.propietario_embarcacion = data.propietario_embarcacion;
            this.documento_acredita = data.documento_acredita;
            this.data_boats = data.data_boats;

            this.search_vessel_field = data.search_vessel_field;
            //tab 6
            this.birthdate = data.birthdate;
            this.age = data.age;
            this.genre = data.genre;
            this.marital_state = data.marital_state;
            this.otro_marital_state = data.otro_marital_state;
            this.read_write = data.read_write;
            this.education_level = data.education_level;
            this.otro_education_level = data.otro_education_level;
            this.own_home = data.own_home;
            this.healt_service = data.healt_service;
            this.otro_healt_service = data.otro_healt_service;
            this.pesca_time = data.pesca_time;
            this.otro_pesca_time = data.otro_pesca_time;
            this.dedication = data.dedication;
            this.hour_pesca = data.hour_pesca;
            //tab 7
            this.observations = data.observations;
        });
    }
}
