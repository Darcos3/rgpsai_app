import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { Events } from '../../config/events';
import { Preferences } from '@capacitor/preferences';

@Component({
    selector: 'app-registers',
    templateUrl: './registers.page.html',
    styleUrls: ['./registers.page.scss'],
})

export class RegistersPage implements OnInit {

    constructor(
        private alertController: AlertController,
        private loadingController: LoadingController,
        private api: ApiRestService,
        private router: Router,
        private zone: NgZone,
        private events: Events
    ) {
        this.events.subscribe('updateRegisters', (data: any) => {
            this.zone.run(() => {
                this.validateSession();
            });
        });
    }

    //generals
    public dataStoragePescador: any[] = [];
    public dataStorage: any[] = [];
    public dataStorageArtesanal: any[] = [];
    data: any;
    dataArtesanal: any;
    dataPescador: any;
    typeSelected: any = 1;
    dataLocal: any;
    tokenUser: any;
    userID: any;

    ngOnInit() {

        this.zone.run(() => {
            this.validateSession();
        });

        this.changeTab(1);
    }

    async validateSession(){

        this.data = [];
        this.dataArtesanal = [];
        let dataSession = await Preferences.get({ key: 'sessionPersistence' });
        let session = JSON.parse(dataSession.value);

        if(session){
            
            if(session.userID){
                this.userID = session.userID;
            }

            if(session.userToken){
                this.tokenUser = session.userToken;
            }
        
        }else{

            this.router.navigate(['login']);
        }

        //this.updateArtesanalArray();
        //this.updateIndustrialArray();

        let dataRegistersIndustrial = await Preferences.get({ key: 'dataRegistersIndustrial' });
        let sessionDataRegistersIndustrial = JSON.parse(dataRegistersIndustrial.value);

        if (sessionDataRegistersIndustrial) {
            this.data = this.sortByKey(sessionDataRegistersIndustrial, 'creation_date');
            //console.log(this.data)
        }

        let dataRegistersArtesanal = await Preferences.get({ key: 'dataRegistersArtesanal' });
        let sessionDataRegistersArtesanal = JSON.parse(dataRegistersArtesanal.value);

        if (sessionDataRegistersArtesanal) {
            this.dataArtesanal = this.sortByKey(sessionDataRegistersArtesanal, 'creation_date');
            //console.log(this.dataArtesanal)
        }

        let dataRegistersPescadores = await Preferences.get({ key: 'dataRegistersPescadores' });
        let sessionDataRegistersPescadores = JSON.parse(dataRegistersPescadores.value);

        if (sessionDataRegistersPescadores) {
            this.dataPescador = this.sortByKey(sessionDataRegistersPescadores, 'creation_date');
            //console.log(this.dataPescador)
        }
    }

    sortByKey(array, key) {
        return array.sort(function (b, a) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 0 : 1));
        });
    }

    //change tab
    changeTab(type) {
        this.typeSelected = type;
    }

    //create/edit industrial
    goToIndustrial(item) {
        this.router.navigate(["industrials", item]);
    }

    //create/edit artesanal
    goToArtesanal(item) {
        this.router.navigate(["artesanals", item]);
    }

    //create/edit pescador
    goToPescador(item) {
        this.router.navigate(["pescador", item]);
    }

    //open detail industrial
    detailIndustrial(id) {
        this.router.navigate(["industrials/detail", id]);
    }

    //open detail artesanal
    detailArtesanal(id) {
        this.router.navigate(["artesanals/detail", id]);
    }

    //open detail pescador
    detailPescador(id) {
        this.router.navigate(["pescador/detail", id]);
    }

    //delete industrial record
    async deleteIndustrial(registerID) {

        let dataRegisters = await Preferences.get({ key: 'dataRegistersIndustrial' });
        let response = JSON.parse(dataRegisters.value);
        this.dataStorage = response;

        const alert = await this.alertController.create({
            header: 'Confirmación!',
            message: '¿Esta seguro de realizar esta acción?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {},
                },
                {
                    text: 'Si',
                    role: 'confirm',
                    handler: () => {

                        let items = this.dataStorage.filter((item) => {
                            return item.id === registerID;
                        });
        
                        items.forEach((element) => {
                            var index = this.dataStorage.indexOf(element);
                            this.dataStorage.splice(index, 1)
                        });        

                        this.updateIndustrialArray();
                    },
                },
            ],
        });

        await alert.present();
    }

    //delete industrial record
    async deleteArtesanals(registerID) {

        let dataRegisters = await Preferences.get({ key: 'dataRegistersArtesanal' });
        let response = JSON.parse(dataRegisters.value);
        this.dataStorageArtesanal = response;

        const alert = await this.alertController.create({
            header: 'Confirmación!',
            message: '¿Esta seguro de realizar esta acción?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {},
                },
                {
                    text: 'Si',
                    role: 'confirm',
                    handler: () => {

                        let items = this.dataStorageArtesanal.filter((item) => {
                            return item.id === registerID;
                        });
        
                        items.forEach((element) => {
                            var index = this.dataStorageArtesanal.indexOf(element);
                            this.dataStorageArtesanal.splice(index, 1)
                        });        

                        this.updateArtesanalArray();
                    },
                },
            ],
        });

        await alert.present();
    }

    //delete industrial record
    async deletePescador(registerID) {

        let dataRegisters = await Preferences.get({ key: 'dataRegistersPescadores' });
        let response = JSON.parse(dataRegisters.value);
        this.dataStoragePescador = response;

        const alert = await this.alertController.create({
            header: 'Confirmación!',
            message: '¿Esta seguro de realizar esta acción?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {},
                },
                {
                    text: 'Si',
                    role: 'confirm',
                    handler: () => {

                        let items = this.dataStoragePescador.filter((item) => {
                            return item.id === registerID;
                        });
        
                        items.forEach((element) => {
                            var index = this.dataStoragePescador.indexOf(element);
                            this.dataStoragePescador.splice(index, 1)
                        });        

                        this.updatePescadoresArray();
                    },
                },
            ],
        });

        await alert.present();
    }

    //upload industrial
    async getStoreIndustrials(registerID) {

        let object = Object();

        let dataRegistersIndustrial = await Preferences.get({ key: 'dataRegistersIndustrial' });
        let responseJson = JSON.parse(dataRegistersIndustrial.value);

        if (responseJson) {

            //console.log(response);
            this.dataStorage = responseJson;

            let items = this.dataStorage.filter((item) => {
                return item.id === registerID;
            });

            items.forEach((data) => {
                data.status = 3;
                //object.user_id = this.userID;
                //tab 1
                object.lugar = data.lugar.id;
                object.fecha_expedicion = data.fecha_expedicion;
                //tab 2
                object.permisionario = data.permisionario;
                object.nit = data.nit;
                //tab 3
                object.nombre_barco = data.nombre_barco;
                object.numero_matricula = data.numero_matricula;
                object.lugar_matricula = data.lugar_matricula;
                object.fecha_matricula = data.fecha_matricula;
                object.vencimiento_matricula = data.vencimiento_matricula;
                //tab 4
                object.bandera = data.bandera ? data.bandera : null;
                object.puerto_registro = data.puerto_registro ? data.puerto_registro : null;
                object.otro_puerto_registro = data.otro_puerto_registro;
                object.tipo_barco = data.tipo_barco ? data.tipo_barco : null;
                object.otro_tipo_barco = data.otro_tipo_barco;
                object.valor_embarcacion = data.valor_embarcacion;
                object.venta_productos_a = data.venta_productos_a;
                //tab 5
                object.eslora = data.eslora;
                object.manga = data.manga;
                object.tonelaje = data.tonelaje;
                object.tonelaje_registro_bruto = data.tonelaje_registro_bruto;
                object.potencia_motor_ppal = data.potencia_motor_ppal;
                object.unidad_potencia = data.unidad_potencia ? data.unidad_potencia : null;
                object.material_casco = data.material_casco ? data.material_casco : null;
                object.numero_bodegas = data.numero_bodegas;
                object.alto_bodegas = data.alto_bodegas;
                object.largo_bodegas = data.largo_bodegas;
                object.ancho_bodegas = data.ancho_bodegas;
                object.capacidad_bodegas = data.capacidad_bodegas;
                object.tipo_conservacion = data.tipo_conservacion ? data.tipo_conservacion : null;
                object.nombre_admin_agencia = data.nombre_admin_agencia;
                object.numero_tripulantes = data.numero_tripulantes;
                object.numero_pescadores = data.numero_pescadores;
                object.valor_arte_pesca = data.valor_arte_pesca;
                object.zona_pesca = data.zona_pesca;
                object.denominacion_arte_pesca = data.denominacion_arte_pesca ? data.denominacion_arte_pesca : null;
                object.otra_denominacion_arte_pesca = data.otra_denominacion_arte_pesca;
                object.tipo_anzuelo =  data.tipo_anzuelo ? data.tipo_anzuelo : null;
                object.tamano_anzuelo = data.tamano_anzuelo;
                object.cantidad_anzuelos = data.cantidad_anzuelos;
                object.longitud_linea_madre = data.longitud_linea_madre;
                object.material_linea_madre = data.material_linea_madre ? data.material_linea_madre : null;
                object.material_bajantes = data.material_bajantes ? data.material_bajantes : null;
                object.otro_material_bajantes = data.otro_material_bajantes;
                object.cantidad_total_lineas = data.cantidad_total_lineas;
                object.denominacion_alerta = data.denominacion_alerta ? data.denominacion_alerta : null;
                object.otra_denominacion_del_arte = data.otra_denominacion_del_arte;
                object.cantidad_trampas_nasas = data.cantidad_trampas_nasas;
                object.material_ppal_trampas = data.material_ppal_trampas ? data.material_ppal_trampas : null;
                object.otro_material_ppal = data.otro_material_ppal;
                object.tipo_artefactos = data.tipo_artefactos ? data.tipo_artefactos : null;
                object.otro_tipo_artefacto = data.otro_tipo_artefacto;
                object.cantidad_artefactos = data.cantidad_artefactos;
                object.material_artefacto = data.material_artefacto ? data.material_artefacto : null;
                object.otro_material_artefacto = data.otro_material_artefacto;
                object.uso_dispositivos = data.uso_dispositivos ? data.uso_dispositivos : null;
                object.tipo_fad_usados = data.tipo_fad_usados ? data.tipo_fad_usados.id : 'N/A';
                object.otro_tipo_fad_usados = data.otro_tipo_fad_usados;
                object.cantidad_fad_usados = data.cantidad_fad_usados;
                object.componentes_fad = data.componentes_fad;
                //tab6
                object.cartas_navegacion = data.cartas_navegacion ? data.cartas_navegacion : 'N/A';;
                object.compas_magnetico = data.compas_magnetico ? data.compas_magnetico : 'N/A';;
                object.gps = data.gps ? data.gps : 'N/A';;
                object.loran = data.loran ? data.loran : 'N/A';;
                object.radar = data.radar ? data.radar : 'N/A';;
                object.ecosonda = data.ecosonda ? data.ecosonda : 'N/A';;
                object.radios_comunicacion = data.radios_comunicacion ? data.radios_comunicacion : 'N/A';;
                //tab 7
                object.firma_representante = data.signature;
                object.fotos_embarcacion = data.fotos_embarcacion;
                object.observations = data.observations;
                //new
                object.calado = data.calado;
                object.otra_unidad_potencia = data.otra_unidad_potencia;
                object.otro_material_casco = data.otro_material_casco;
                object.otro_tipo_conservacion = data.otro_tipo_conservacion;
                object.radicado = data.radicado;
                object.codigo_verificacion = data.codigo_verificacion;
                object.nombre_propietario = data.nombre_propietario;
                object.tipo_identificacion = data.tipo_identificacion;
                object.otro_tipo_identificacion = data.otro_tipo_identificacion;
                object.numero_identificacion = data.numero_identificacion;
                object.nombre_representante = data.nombre_representante;
                object.tipo_identificacion_representante = data.tipo_identificacion_representante;
                object.otro_tipo_identificacion_representante = data.otro_tipo_identificacion_representante;
                object.numero_identificacion_representante = data.numero_identificacion_representante;
                object.cargo_representante = data.cargo_representante;
                object.artes_de_pesca = data.artes_de_pesca;
                object.otro_arte_pesca = data.otro_arte_pesca;
                object.puerto_desembarque = data.puerto_desembarque ? data.puerto_desembarque : null;
                object.otro_puerto_desembarque = data.otro_puerto_desembarque;
            });
        }

        //console.log('Datos enviados...', object);
        const loading = await this.loadingController.create({
            message: 'Cargando...',
            spinner: 'crescent',
            showBackdrop: true,
        });

        await loading.present();

        this.api.getStoreIndustrials(object, "Bearer " + this.tokenUser).subscribe(response => {

            loading.dismiss();

            if (response[0].codigo == 200) {

                console.log(response[0]);

                let items = this.dataStorage.filter((item) => {
                    return item.id === registerID;
                });

                items.forEach((element) => {
                    var index = this.dataStorage.indexOf(element);
                    this.dataStorage.splice(index, 1)
                });         
                
                this.alertUpload(response[0].message);

            } else {
                this.presentError(response[0].message)
            }

        }, err => {
            
            //console.log(err, this.tokenUser);
            loading.dismiss();

            if (err.status == '401') {
                this.presentError("Tu sesión ha expirado, por favor inicia sesión nuevamente");
                this.closeSession();
                this.router.navigate(["login"]);
            } else {
                this.presentError('No podemos procesar tu solicitud en este momento, intenta más tarde.')
            }
        });
    }

    //uplad register server
    async alertUpload(message) {

        const alert = await this.alertController.create({
            header: 'Confirmación',
            message: message,
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.updateIndustrialArray();
                    }
                }
            ]
        });

        await alert.present();
    }

    //upload industrial
    async getStoreArtesanal(registerID) {

        let object = Object();

        let dataRegistersArtesanal = await Preferences.get({ key: 'dataRegistersArtesanal' });
        let responseObject = JSON.parse(dataRegistersArtesanal.value);

        if (responseObject) {

            this.dataStorageArtesanal = responseObject;

            let items = this.dataStorageArtesanal.filter((item) => {
                return item.id === registerID;
            });

            items.forEach((data) => {
                //object.user_id = this.userID;
                data.status = 3;
                //tab 1
                object.lugar = data.lugar ? data.lugar : null;
                object.fecha_expedicion = data.lugar ? data.fecha_expedicion : null;
                //tab 2
                object.permisionario = data.permisionario;
                object.nit = data.nit;
                //tab 3
                object.nombre_barco = data.nombre_barco;
                object.numero_matricula = data.numero_matricula ? (data.numero_matricula).toUpperCase() : null;
                object.lugar_matricula = data.lugar_matricula;
                object.fecha_matricula = data.fecha_matricula;
                object.vencimiento_matricula = data.vencimiento_matricula;
                //tab 4
                object.bandera = data.bandera ? data.bandera.codigo : null;
                object.puerto_registro = data.puerto_registro ? data.puerto_registro : null;
                object.otro_puerto_registro = data.otro_puerto_registro;
                object.tipo_barco = data.tipo_barco ? data.tipo_barco : null;
                object.otro_tipo_barco = data.otro_tipo_barco;
                object.valor_embarcacion = data.valor_embarcacion;
                object.venta_productos_a = data.venta_productos_a;
                //tab 5
                object.eslora = data.eslora;
                object.manga = data.manga;
                object.tonelaje = data.tonelaje;
                object.tonelaje_registro_bruto = data.tonelaje_registro_bruto;
                object.potencia_motor_ppal = data.potencia_motor_ppal;
                object.unidad_potencia = data.unidad_potencia ? data.unidad_potencia : null;
                object.material_casco = data.material_casco ? data.material_casco : null;
                object.numero_bodegas = data.numero_bodegas;
                object.alto_bodegas = data.alto_bodegas;
                object.largo_bodegas = data.largo_bodegas;
                object.ancho_bodegas = data.ancho_bodegas;
                object.capacidad_bodegas = data.capacidad_bodegas;
                object.tipo_conservacion = data.tipo_conservacion ? data.tipo_conservacion : null;
                object.nombre_admin_agencia = data.nombre_admin_agencia;
                object.numero_tripulantes = data.numero_tripulantes;
                object.numero_pescadores = data.numero_pescadores;
                object.valor_arte_pesca = data.valor_arte_pesca;
                object.zona_pesca = data.zona_pesca;

                object.denominacion_arte_pesca = data.denominacion_arte_pesca ?  data.denominacion_arte_pesca : null;
                object.otra_denominacion_arte_pesca = data.otra_denominacion_arte_pesca;
                object.tipo_anzuelo = data.tipo_anzuelo ? data.tipo_anzuelo : null;
                object.tamano_anzuelo = data.tipo_anzuelo ? data.tamano_anzuelo : null;
                object.cantidad_anzuelos = data.cantidad_anzuelos;
                object.longitud_linea_madre = data.longitud_linea_madre;
                object.material_linea_madre = data.material_linea_madre ? data.material_linea_madre : 1;
                object.material_bajantes = data.material_bajantes ? data.material_bajantes : null;
                object.otro_material_bajantes = data.otro_material_bajantes;
                object.cantidad_total_lineas = data.cantidad_total_lineas;
                object.denominacion_alerta = data.denominacion_alerta ? data.denominacion_alerta : null;
                object.otra_denominacion_del_arte = data.otra_denominacion_del_arte;
                object.cantidad_trampas_nasas = data.cantidad_trampas_nasas;
                object.material_ppal_trampas = data.material_ppal_trampas ? data.material_ppal_trampas : null;
                object.otro_material_ppal = data.otro_material_ppal;
                object.tipo_artefactos = data.tipo_artefactos? data.tipo_artefactos:null;
                object.otro_tipo_artefacto = data.otro_tipo_artefacto;
                object.cantidad_artefactos = data.cantidad_artefactos;
                object.material_artefacto = data.material_artefacto ? data.material_artefacto : null;
                object.otro_material_artefacto = data.otro_material_artefacto;
                object.uso_dispositivos = data.uso_dispositivos ? data.uso_dispositivos : null;
                object.tipo_fad_usados = data.tipo_fad_usados ? data.tipo_fad_usados : 'N/A';
                object.otro_tipo_fad_usados = data.otro_tipo_fad_usados;
                object.cantidad_fad_usados = data.cantidad_fad_usados;
                object.componentes_fad = data.componentes_fad;
                //tab6
                object.cartas_navegacion = data.cartas_navegacion ? data.cartas_navegacion : 'N/A';;
                object.compas_magnetico = data.compas_magnetico ? data.compas_magnetico : 'N/A';;
                object.gps = data.gps ? data.gps : 'N/A';;
                object.loran = data.loran ? data.loran : 'N/A';;
                object.radar = data.radar ? data.radar : 'N/A';;
                object.ecosonda = data.ecosonda ? data.ecosonda : 'N/A';;
                object.radios_comunicacion = data.radios_comunicacion ? data.radios_comunicacion : 'N/A';;
                //tab 7
                object.firma_representante = data.signature;
                object.fotos_embarcacion = data.fotos_embarcacion;
                object.observations = data.observations;
                //new
                object.tipo_registro = data.tipo_registro;
                object.tipo_propulsion = data.tipo_propulsion ? data.tipo_propulsion : null;
                object.nombre_propietario = data.nombre_propietario;
                object.tipo_identificacion = data.tipo_identificacion;
                object.otro_tipo_identificacion = data.otro_tipo_identificacion;
                object.numero_identificacion = data.numero_identificacion;
                //new
                object.calado = data.calado;
                object.otra_unidad_potencia = data.otra_unidad_potencia;
                object.otro_material_casco = data.otro_material_casco;
                object.otro_tipo_conservacion = data.otro_tipo_conservacion;
                object.radicado = data.radicado;
                object.codigo_verificacion = data.codigo_verificacion;
                object.nombre_representante = data.nombre_representante;
                object.tipo_identificacion_representante = data.tipo_identificacion_representante;
                object.otro_tipo_identificacion_representante = data.otro_tipo_identificacion_representante;
                object.numero_identificacion_representante = data.numero_identificacion_representante;
                object.cargo_representante = data.cargo_representante;
                object.artes_de_pesca = data.artes_de_pesca;
                object.otro_arte_pesca = data.otro_arte_pesca;
                object.tiene_matricula = data.tiene_matricula;
                object.puerto_desembarque = data.puerto_desembarque ? data.puerto_desembarque : null;
                object.otro_puerto_desembarque = data.otro_puerto_desembarque;
            });
        }
        
        // alert(JSON.stringify(object.fotos_embarcacion, null, 2));
        const loading = await this.loadingController.create({
            message: 'Cargando...',
            spinner: 'crescent',
            showBackdrop: true,
        });

        await loading.present();

        this.api.getStoreArtesanals(object, "Bearer " + this.tokenUser).subscribe(response => {

            loading.dismiss();
            
            console.log(response[0]);

            if (response[0].codigo == 200) {

                this.alertUploadArtesanal(response[0].message);

                let items = this.dataStorageArtesanal.filter((item) => {
                    return item.id === registerID;
                });

                items.forEach((element) => {
                    var index = this.dataStorageArtesanal.indexOf(element)
                    this.dataStorageArtesanal.splice(index, 1)
                });               

            } else {
                this.presentError(response[0].message)
            }

        }, err => {
            //console.log(err, this.tokenUser);
            loading.dismiss();

            if (err.status == '401') {
                this.presentError("Tu sesión ha expirado, por favor inicia sesión nuevamente");
                this.closeSession();
                this.router.navigate(["login"]);
            } else {
                this.presentError('No podemos procesar tu solicitud en este momento, intenta más tarde.')
            }
        });
    }

    //uplad register server
    async alertUploadArtesanal(message) {

        const alert = await this.alertController.create({
            header: 'Confirmación',
            message: message,
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.updateArtesanalArray(); 
                    }
                }
            ]
        });

        await alert.present();
    }

    //upload industrial
    async getStorePescador(registerID) {

        let object = Object();

        let dataRegistersPescadores = await Preferences.get({ key: 'dataRegistersPescadores' });
        let responseObject = JSON.parse(dataRegistersPescadores.value);

        if (responseObject) {

            this.dataStoragePescador = responseObject;

            let items = this.dataStoragePescador.filter((item) => {
                return item.id === registerID;
            });

            items.forEach((data) => {
               //tab 1
                object.boatId = data.boatId;
                object.department = data.department.codigo;
                object.filed = data.filed;
                object.filing_date = new Date(data.filing_date).toLocaleString();
                //tab 2
                object.copy_identification_document = data.copy_identification_document;
                object.copy_occre = data.copy_occre;
                object.copy_sisben = data.copy_sisben;
                object.accreditation_certificate = data.accreditation_certificate;
                object.certification_issued_by = data.certification_issued_by.id;
                object.vigencia_permiso = data.vigencia_permiso;
                object.expedition_date = data.expedition_date;
                object.expiration_date = data.expiration_date;
                //tab 3
                object.fisherman_photo_file = data.photo;
                object.name = data.name;
                object.lastname = data.lastname;
                object.type_of_card = data.type_of_card;
                object.identification_number = data.identification_number;
                object.occre = data.occre;
                object.no_occre = data.no_occre;
                object.nationality = data.nationality.codigo;
                object.email = data.email;
                object.address = data.address;
                object.phone = data.phone;
                object.organization_cooperative = data.organization_cooperative;
                object.organization_name = data.organization_name.name;
                //tab 4
                object.landing_zone = data.dembarque_port.codigo;
                object.frequent_fishing_area = data.zona_frecuente_pesca;
                object.type_of_artesanal_boat = data.tipo_embarcacion_artesanal;
                object.other_type_of_artesanal_boat = data.otro_tipo_embarcacion_artesanal;
                object.types_fishery = data.tipo_pesqueria;
                object.artes_pesca = data.artes_pesca;
                //tab 5
                object.report_boat = data.reporta_embarcacion;
                object.propietario_embarcacion = data.propietario_embarcacion;
                object.documento_acredita = data.documento_acredita;
                object.data_boats = data.data_boats;
                //tab six
                object.birth_date = data.birthdate;
                object.age = data.age;
                object.gender = data.genre;
                object.marital_status = data.marital_state;
                object.other_marital_status = data.otro_marital_state;
                object.read_and_write = data.read_write;
                object.education_level = data.education_level;
                object.other_education_level = data.otro_education_level;
                object.own_house = data.own_home;
                object.type_health_service = data.healt_service;
                object.other_type_health_service = data.otro_healt_service;
                object.fishing_time = data.pesca_time;
                object.other_fishing_time = data.otro_pesca_time;
                object.time_in_activity = data.dedication;
                object.fishing_schedule = data.hour_pesca;
                //tab seven
                object.observations = data.observations;
                object.estado = data.status;
                object.update_date = data.update_date;
                object.signature = data.signature;
            });
        }
         
        const loading = await this.loadingController.create({
            message: 'Cargando...',
            spinner: 'crescent',
            showBackdrop: true,
        });

        await loading.present();

        this.api.getStorePescador(object, "Bearer " + this.tokenUser).subscribe(response => {

            loading.dismiss();
            
            console.log(response[0])

            if (response[0].id > 0) {

                this.alertUploadPescador('Registro creado exitosamente en el servidor, será eliminado de la base de datos interna.');

                let items = this.dataStoragePescador.filter((item) => {
                    item.estado = 3;
                    return item.id === registerID;
                });

                items.forEach((element) => {
                    var index = this.dataStoragePescador.indexOf(element)
                    // console.log(index)
                    // this.dataStoragePescador.splice(index, 1);
                    // let status = element.status = 3; 
                    // this.dataStorage.push( element.id, status )
                });               

            } else {
                this.presentError('Erro en la operación, intente más tarde')
            }

        }, err => {
            //console.log(err, this.tokenUser);
            loading.dismiss();

            if (err.status == '401') {
                this.presentError("Tu sesión ha expirado, por favor inicia sesión nuevamente");
                this.closeSession();
                this.router.navigate(["login"]);
            } else {
                this.presentError('No podemos procesar tu solicitud en este momento, intenta más tarde.')
            }
        });
    }

    //uplad register server
    async alertUploadPescador(message) {

        const alert = await this.alertController.create({
            header: 'Confirmación',
            message: message,
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.updatePescadoresArray(); 
                    }
                }
            ]
        });

        await alert.present();
    }

    //close sessión
    async closeSession(){
        await Preferences.remove({ key: 'sessionPersistence' });
    }

    async updateIndustrialArray(){
        await Preferences.set({
            key: 'dataRegistersIndustrial',
            value: JSON.stringify(this.dataStorage),
        }).then(() => {
            this.events.publish('updateRegisters', []);
        });
    }

    async updateArtesanalArray(){
        await Preferences.set({
            key: 'dataRegistersArtesanal',
            value: JSON.stringify(this.dataStorageArtesanal),
        }).then(() => {
            this.events.publish('updateRegisters', []);
        });
    }

    async updatePescadoresArray(){
        await Preferences.set({
            key: 'dataRegistersPescadores',
            value: JSON.stringify(this.dataStoragePescador),
        }).then(() => {
            this.events.publish('updateRegisters', []);
        });
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
}
