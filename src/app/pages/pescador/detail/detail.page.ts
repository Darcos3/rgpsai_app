import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/config/events';
import SignaturePad from 'signature_pad';
import { Preferences } from '@capacitor/preferences';
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
} from '../../../config/data';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})

export class DetailPage implements OnInit {

    tipo_identificacion_representante:number = 0;

    @ViewChild('signaturePad') signaturePad : ElementRef;
    signatureForm: SignaturePad;
    
    public dataStorage: any[] = [];
    id: any = this.activatedRoute.snapshot.paramMap.get('id');;
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
    search_vessel_field:any;
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
    signature: any;
    status: any;
    update_date: any;

    //dropdowns
    lugares: any;
    tipoEmbarcacionArnal: any;
    genres: any;
    maritalStates: any;
    educationLevels: any;
    servicesHealt: any;
    timePesca: any;
    dedicationDrop: any;
    horarioPesca: any;

    constructor(
        private alertController: AlertController,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private events: Events
    ) { }

    ngAfterViewInit() {
        this.signatureForm = new SignaturePad(this.signaturePad.nativeElement);
    }

    ngOnInit() {
        this.loadData();
        this.lugares = LocationsMunicipios;
        this.tipoEmbarcacionArnal = TipoEmbarcacionArtesanal;
        this.genres = Genero;
        this.maritalStates = EstadoCivil;
        this.educationLevels = NivelEducativo;
        this.servicesHealt = ServicioSalud;
        this.timePesca = TiempoPesca;
        this.dedicationDrop = Dedicacion;
        this.horarioPesca = HorarioPesca;
    }

    async loadData(){

        let dataRegisters = await Preferences.get({ key: 'dataRegistersPescadores' });
        let response = JSON.parse(dataRegisters.value);

        if (response) {

            this.dataStorage = response;

            if (this.id != 0) {

                let items = this.dataStorage.filter((item) => {
                    return item.id === this.id;
                });

                console.log('Data', items);

                items.forEach((data) => {
                    //tab 1
                    this.department = data.department;
                    this.filed = data.filed;
                    this.filing_date = new Date(data.filing_date).toLocaleDateString().split('T')[0];
                    //tab 2
                    this.copy_identification_document = data.copy_identification_document;
                    this.copy_occre = data.copy_occre;
                    this.copy_sisben = data.copy_sisben;
                    this.accreditation_certificate = data.accreditation_certificate;
                    this.certification_issued_by = data.certification_issued_by;
                    this.vigencia_permiso = data.vigencia_permiso;
                    this.expedition_date = new Date(data.expedition_date).toLocaleDateString().split('T')[0];
                    this.expiration_date = new Date(data.expiration_date).toLocaleDateString().split('T')[0];
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
                    this.organization_cooperative = data.organization_cooperative;
                    this.organization_name = data.organization_name;
                    //tab 4
                    this.dembarque_port = data.dembarque_port;
                    this.zona_frecuente_pesca = data.zona_frecuente_pesca;
                    this.tipo_embarcacion_artesanal = this.tipoEmbarcacionArnal.find(({ codigo }) => codigo === data.tipo_embarcacion_artesanal).nombre;;
                    this.otro_tipo_embarcacion_artesanal = data.otro_tipo_embarcacion_artesanal;
                    this.tipo_pesqueria = data.tipo_pesqueria;
                    this.artes_pesca = data.artes_pesca;
                    //tab 5
                    this.reporta_embarcacion = data.reporta_embarcacion;
                    this.propietario_embarcacion = data.propietario_embarcacion;
                    this.documento_acredita = data.documento_acredita;
                    this.data_boats = data.data_boats;
                    //tab six
                    this.birthdate = new Date(data.birthdate).toLocaleDateString().split('T')[0];
                    this.age = data.age;
                    this.genre = this.genres.find(({ codigo }) => codigo === data.genre).nombre;
                    this.marital_state = this.maritalStates.find(({ codigo }) => codigo === data.marital_state).nombre;
                    this.otro_marital_state = data.otro_marital_state;
                    this.read_write = data.read_write;
                    this.education_level = this.educationLevels.find(({ codigo }) => codigo === data.education_level).nombre;
                    this.otro_education_level = data.otro_education_level;
                    this.own_home = data.own_home;
                    this.healt_service = this.servicesHealt.find(({ codigo }) => codigo === data.healt_service).nombre;
                    this.otro_healt_service = data.otro_healt_service;
                    this.pesca_time = this.timePesca.find(({ codigo }) => codigo === data.pesca_time).nombre;
                    this.otro_pesca_time = data.otro_pesca_time;
                    this.dedication = this.dedicationDrop.find(({ codigo }) => codigo === data.dedication).nombre;
                    this.hour_pesca = this.horarioPesca.find(({ codigo }) => codigo === data.hour_pesca).nombre;
                    //tab seven
                    this.observations = data.observations;
                    this.status = data.status;
                    this.update_date = data.update_date;
                    this.signature = data.signature;
                });
            }
        }
    }

    async SignatureDoc() {

        this.savePad();

        if(!this.signature){
            this.presentMessage('Advertencia', 'Debes firmar para poder continuar.');
            return;
        }

        let items = this.dataStorage.filter((item) => {
            return item.id === this.id;
        });

        items.forEach((data) => {
            data.firma_representante = this.signature;
            data.signature = this.signature;
            data.status = 2; //signature
        });

        await Preferences.set({
            key: 'dataRegistersPescadores',
            value: JSON.stringify(this.dataStorage),
        }).then(() => {
            this.AlertStore();
        });

        this.clearPad();
    }

    //uplad register server
    async AlertStore() {

        const alert = await this.alertController.create({
            header: 'Confirmación',
            message: 'Documento firmado exitosamente',
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.events.publish('updateRegisters', []);
                        this.router.navigate(["registers"]);
                    }
                }
            ]
        });

        await alert.present();
    }

    //store signature
    savePad() {
        const base64Data = this.signatureForm.toDataURL();
        this.signature = this.signatureForm['_isEmpty']==true ? null : base64Data;
        //console.log(this.signatureImgOwner);
    }

    //clean pad signature
    clearPad() {
        this.signatureForm.clear();
    }

    //alert with warning
    async presentMessage(title, message, redirect:boolean=false) {

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
}
