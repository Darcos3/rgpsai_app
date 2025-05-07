import { Component, OnInit } from '@angular/core';
import {
    RequestPlaces,
    Countries,
    RegistersPorts,
    ShipType,
    UnityPotence,
    MaterialCasco,
    ConservationFishType,
    DenominacionAnzuelo,
    TipoAnzuelo,
    MaterialLineaMadre,
    MaterialBajantes,
    DenominacionArtesPesca,
    MaterialPpalTrampa,
    TipoArtefactos,
    MaterialArtefacto,
    Booleans,
    TipoFads,
    DembarquePorts
} from '../../config/data';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/config/events';
import { Network } from '@capacitor/network';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiRestService } from 'src/app/services/api-rest.service';

@Component({
    selector: 'app-industrials',
    templateUrl: './industrials.page.html',
    styleUrls: ['./industrials.page.scss'],
})

export class IndustrialsPage implements OnInit {

    constructor(
        private actionSheetController: ActionSheetController,
        private loadingController : LoadingController,
        private alertController: AlertController,
        private activatedRoute: ActivatedRoute,
        private api: ApiRestService,
        private router: Router,
        private events: Events
    ) { }

    public dataStorage: any[] = [];

    //dropdowns
    lugares: any;
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

    //############################### VARS
    //is new or old register
    id: any = this.activatedRoute.snapshot.paramMap.get('id');
    //tabs
    actualTab: number = this.id==0 ? 0 : 1;
    counter: number = this.id==0 ? 0 : 1;
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
    //tab 0
    searchBoat: any;
    matricula_search: any = '';
    //tab 1
    lugar: any;
    fecha_expedicion: any;
    //tab 2
    permisionario: any;
    nit: any;
    //tab 3
    nombre_barco: any;
    numero_matricula: any;
    lugar_matricula: any;
    fecha_matricula: any;
    vencimiento_matricula: any;
    //tab 4
    bandera: any;
    puerto_registro: any;
    otro_puerto_registro: any;
    tipo_barco: any;
    otro_tipo_barco: any;
    valor_embarcacion: any;
    venta_productos_a: any;
    //tab 5
    eslora: any;
    manga: any;
    tonelaje: any;
    tonelaje_registro_bruto: any;
    potencia_motor_ppal: any;
    unidad_potencia: any;
    material_casco: any;
    numero_bodegas: any;
    alto_bodegas: any; //- = 0
    largo_bodegas: any; //- = 0
    ancho_bodegas: any; //- = 0
    capacidad_bodegas: any;
    tipo_conservacion: any;
    nombre_admin_agencia: any;
    numero_tripulantes: any;
    numero_pescadores: any;
    valor_arte_pesca: any;
    zona_pesca: any;
    denominacion_arte_pesca: any;
    otra_denominacion_arte_pesca: any;
    tipo_anzuelo: any;
    tamano_anzuelo: any;
    cantidad_anzuelos: any;
    longitud_linea_madre: any;
    material_linea_madre: any;
    material_bajantes: any;
    otro_material_bajantes: any;
    cantidad_total_lineas: any;
    denominacion_alerta: any;
    otra_denominacion_del_arte: any;
    cantidad_trampas_nasas: any;
    material_ppal_trampas: any;
    otro_material_ppal: any;
    tipo_artefactos: any;
    otro_tipo_artefacto: any;
    cantidad_artefactos: any;
    material_artefacto: any;
    otro_material_artefacto: any;
    uso_dispositivos: any;
    tipo_fad_usados: any;
    otro_tipo_fad_usados: any;
    cantidad_fad_usados: any;
    componentes_fad: any;
    //tab6
    cartas_navegacion: any;
    compas_magnetico: any;
    gps: any;
    loran: any;
    radar: any;
    ecosonda: any;
    radios_comunicacion: any;
    //tab 7
    firma_representante: any;
    fotos_embarcacion: any = [];
    observations: any;
    status: any;
    //new
    calado: any;
    otra_unidad_potencia: any;
    otro_material_casco: any;
    otro_tipo_conservacion: any;
    radicado: any;
    codigo_verificacion: any;
    nombre_propietario: any;
    tipo_identificacion: any;
    otro_tipo_identificacion: any;
    numero_identificacion: any;
    nombre_representante: any;
    tipo_identificacion_representante: any;
    otro_tipo_identificacion_representante: any;
    numero_identificacion_representante: any;
    cargo_representante: any;
    artes_de_pesca: any = [];
    otro_arte_pesca: any;
    puerto_desembarque: any;
    otro_puerto_desembarque: any;

    ngOnInit() {

        this.validateSession();

        this.lugares = RequestPlaces;
        this.countries = Countries;
        const newLocal = this;
        //this.portsRegister = RegistersPorts;
        newLocal.shipTypes = ShipType;
        console.log("tipo barcos ", newLocal.shipTypes)


        this.unityPotences = UnityPotence;
        console.log(this.unityPotences)

        this.materialsCasco = MaterialCasco;
        console.log("mc ", this.materialsCasco)

        this.conservationFish = ConservationFishType;
        this.denominacionesAnzuelo = DenominacionAnzuelo;
        this.tiposAnzuelos = TipoAnzuelo;
        this.materialesLineaMadre = MaterialLineaMadre;
        this.mateterialesBajantes = MaterialBajantes;
        this.denomincacionArtesPesca = DenominacionArtesPesca;
        this.materialPpalTrampa = MaterialPpalTrampa;
        this.tiposDeArtefacto = TipoArtefactos;
        this.materialesArtefacto = MaterialArtefacto;
        this.booleans = Booleans;
        console.log("cn ", this.booleans)

        this.tiposFads = TipoFads;
        //this.dembarquePorts = DembarquePorts;

        // if(this.id != 0){
            this.loadData();
        // }
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

        }else{
            this.router.navigate(['login']);
        }

        let dataRegisters = await Preferences.get({ key: 'dataRegistersIndustrial' });
        let sessionRegisters = JSON.parse(dataRegisters.value);

        if(this.id==0 && sessionRegisters && sessionRegisters.length >= 10){
            this.presentMessage('Advertencia', 'No podrás registrar más inspecciones a menos que subas una de las que tienes en el listado, solo se permite tenér un máximo de 10 registros por listado.', true);
        }

        this.dataStorage = sessionRegisters ? sessionRegisters : [];

        //dropdowns
        let ddPOL = await Preferences.get({ key: 'sessionSelectFishing' });
        let sDpol = JSON.parse(ddPOL.value);
        let ddSf = await Preferences.get({ key: 'sessionSelectLanding' });
        let sSf = JSON.parse(ddSf.value);
        let ddP = await Preferences.get({ key: 'sessionSelectPorts' });
        let sP = JSON.parse(ddP.value);
        this.artesPesca = sDpol.data;
        this.dembarquePorts = sSf.data;
        this.portsRegister = sP.data;

        console.log("puertos Registro: ", this.portsRegister)
    }

    //load data persistence
    async loadData(){

        let dataRegister = await Preferences.get({ key: 'dataRegistersIndustrial' });
        let response = JSON.parse(dataRegister.value);
        this.dataStorage = response;

        let items = this.dataStorage.filter((item) => {
            return item.id === this.id;
        });

        console.log('Registro: ', items)
        items.forEach((data) => {
            //tab 1
            this.lugar = data.lugar;
            this.fecha_expedicion = data.fecha_expedicion;
            //tab 2
            this.permisionario = data.permisionario;
            this.nit = data.nit;
            //tab 3
            this.nombre_barco = data.nombre_barco;
            this.numero_matricula = data.numero_matricula;
            this.lugar_matricula = data.lugar_matricula;
            this.fecha_matricula = data.fecha_matricula;
            this.vencimiento_matricula = data.vencimiento_matricula;
            //tab 4
            this.bandera = data.bandera;
            this.puerto_registro = data.puerto_registro;
            this.otro_puerto_registro = data.otro_puerto_registro;
            this.tipo_barco = data.tipo_barco;


            this.otro_tipo_barco = data.otro_tipo_barco;
            this.valor_embarcacion = data.valor_embarcacion;
            this.venta_productos_a = data.venta_productos_a;
            //tab 5
            this.eslora = data.eslora;
            this.manga = data.manga;
            this.tonelaje = data.tonelaje;
            this.tonelaje_registro_bruto = data.tonelaje_registro_bruto;
            this.potencia_motor_ppal = data.potencia_motor_ppal;
            this.unidad_potencia = data.unidad_potencia;
            this.material_casco = data.material_casco;
            this.numero_bodegas = data.numero_bodegas;
            this.alto_bodegas = data.alto_bodegas;
            this.largo_bodegas = data.largo_bodegas;
            this.ancho_bodegas = data.ancho_bodegas;
            this.capacidad_bodegas = data.capacidad_bodegas;
            this.tipo_conservacion = data.tipo_conservacion;
            this.nombre_admin_agencia = data.nombre_admin_agencia;
            this.numero_tripulantes = data.numero_tripulantes;
            this.numero_pescadores = data.numero_pescadores;
            this.valor_arte_pesca = data.valor_arte_pesca;
            this.zona_pesca = data.zona_pesca;
            this.denominacion_arte_pesca = data.denominacion_arte_pesca;
            this.otra_denominacion_arte_pesca = data.otra_denominacion_arte_pesca;
            this.tipo_anzuelo = data.tipo_anzuelo;
            this.tamano_anzuelo = data.tamano_anzuelo;
            this.cantidad_anzuelos = data.cantidad_anzuelos;
            this.longitud_linea_madre = data.longitud_linea_madre;
            this.material_linea_madre = data.material_linea_madre;
            this.material_bajantes = data.material_bajantes;
            this.otro_material_bajantes = data.otro_material_bajantes;
            this.cantidad_total_lineas = data.cantidad_total_lineas;
            this.denominacion_alerta = data.denominacion_alerta;
            this.otra_denominacion_del_arte = data.otra_denominacion_del_arte;
            this.cantidad_trampas_nasas = data.cantidad_trampas_nasas;
            this.material_ppal_trampas = data.material_ppal_trampas;
            this.otro_material_ppal = data.otro_material_ppal;
            this.tipo_artefactos = data.tipo_artefactos;
            this.otro_tipo_artefacto = data.otro_tipo_artefacto;
            this.cantidad_artefactos = data.cantidad_artefactos;
            this.material_artefacto = data.material_artefacto;
            this.otro_material_artefacto = data.otro_material_artefacto;
            this.uso_dispositivos = data.uso_dispositivos;
            this.tipo_fad_usados = data.tipo_fad_usados;
            this.otro_tipo_fad_usados = data.otro_tipo_fad_usados;
            this.cantidad_fad_usados = data.cantidad_fad_usados;
            this.componentes_fad = data.componentes_fad;
            //tab6
            this.cartas_navegacion = data.cartas_navegacion;
            this.compas_magnetico = data.compas_magnetico;
            this.gps = data.gps;
            this.loran = data.loran;
            this.radar = data.radar;
            this.ecosonda = data.ecosonda;
            this.radios_comunicacion = data.radios_comunicacion;
            //tab 7
            this.firma_representante = data.firma_representante;
            this.fotos_embarcacion = data.fotos_embarcacion;
            this.observations = data.observations;
            //nuevos
            this.calado = data.calado;
            this.otro_material_casco = data.otro_material_casco;
            this.otra_unidad_potencia = data.otra_unidad_potencia;
            this.otro_tipo_conservacion = data.otro_tipo_conservacion;
            this.radicado = data.radicado;
            this.codigo_verificacion = data.codigo_verificacion;
            this.nombre_propietario = data.nombre_propietario;
            this.tipo_identificacion = data.tipo_identificacion;
            this.otro_tipo_identificacion = data.otro_tipo_identificacion;
            this.numero_identificacion = data.numero_identificacion;
            this.nombre_representante = data.nombre_representante;
            this.tipo_identificacion_representante = data.tipo_identificacion_representante;
            this.otro_tipo_identificacion_representante = data.otro_tipo_identificacion_representante;
            this.numero_identificacion_representante = data.numero_identificacion_representante;
            this.cargo_representante = data.cargo_representante;
            this.artes_de_pesca = data.artes_de_pesca;
            this.otro_arte_pesca = data.otro_arte_pesca;
            this.puerto_desembarque = data.puerto_desembarque;
            this.otro_puerto_desembarque = data.otro_puerto_desembarque;
        });
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
        } else if (this.counter == 1) {
            this.actualTab = 1;
            this.tab0 = 1;
            this.tab1 = 0;
            this.tab2 = 0;
            this.tab3 = 0;
            this.tab4 = 0;
            this.tab5 = 0;
            this.tab6 = 0;
        } else if (this.counter == 2) {
            this.actualTab = 2;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 0;
            this.tab3 = 0;
            this.tab4 = 0;
            this.tab5 = 0;
            this.tab6 = 0;
        } else if (this.counter == 3) {
            this.actualTab = 3;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 1;
            this.tab3 = 0;
            this.tab4 = 0;
            this.tab5 = 0;
            this.tab6 = 0;
        } else if (this.counter == 4) {
            this.actualTab = 4;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 1;
            this.tab3 = 1;
            this.tab4 = 0;
            this.tab5 = 0;
            this.tab6 = 0;
        } else if (this.counter == 5) {
            this.actualTab = 5;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 1;
            this.tab3 = 1;
            this.tab4 = 1;
            this.tab5 = 0;
            this.tab6 = 0;
        } else if (this.counter == 6) {
            this.actualTab = 6;
            this.tab0 = 1;
            this.tab1 = 1;
            this.tab2 = 1;
            this.tab3 = 1;
            this.tab4 = 1;
            this.tab5 = 1;
            this.tab6 = 0;
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
        }
        this.counter++;
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
        this.fotos_embarcacion.push({ image: 'data:image/jpeg;base64,' + imageUrl });
    }

    //storage in local
    async saveInLocal() {

        if (this.id == 0) {

            let object = Object();

            object.id = Math.random().toString(36).substr(2, 9);
            //tab 1
            object.creation_date = Date.now();
            object.lugar = this.lugar;
            object.fecha_expedicion = this.fecha_expedicion;
            //tab 2
            object.permisionario = this.permisionario;
            object.nit = this.nit;
            //tab 3
            object.nombre_barco = this.nombre_barco;
            object.numero_matricula = this.numero_matricula ? this.numero_matricula.toUpperCase() : null;
            object.lugar_matricula = this.lugar_matricula;
            object.fecha_matricula = this.fecha_matricula;
            object.vencimiento_matricula = this.vencimiento_matricula;
            //tab 4
            object.bandera = this.bandera;
            object.puerto_registro = this.puerto_registro;
            object.otro_puerto_registro = this.otro_puerto_registro;
            object.tipo_barco = this.tipo_barco;
            object.otro_tipo_barco = this.otro_tipo_barco;
            object.valor_embarcacion = this.valor_embarcacion;
            object.venta_productos_a = this.venta_productos_a;
            //tab 5
            object.eslora = this.eslora;
            object.manga = this.manga;
            object.tonelaje = this.tonelaje;
            object.tonelaje_registro_bruto = this.tonelaje_registro_bruto;
            object.potencia_motor_ppal = this.potencia_motor_ppal;
            object.unidad_potencia = this.unidad_potencia;
            object.material_casco = this.material_casco;
            object.numero_bodegas = this.numero_bodegas;
            object.alto_bodegas = this.alto_bodegas;
            object.largo_bodegas = this.largo_bodegas;
            object.ancho_bodegas = this.ancho_bodegas;
            object.capacidad_bodegas = this.capacidad_bodegas;
            object.tipo_conservacion = this.tipo_conservacion;
            object.nombre_admin_agencia = this.nombre_admin_agencia;
            object.numero_tripulantes = this.numero_tripulantes;
            object.numero_pescadores = this.numero_pescadores;
            object.valor_arte_pesca = this.valor_arte_pesca;
            object.zona_pesca = this.zona_pesca;
            object.denominacion_arte_pesca = this.denominacion_arte_pesca;
            object.otra_denominacion_arte_pesca = this.otra_denominacion_arte_pesca;
            object.tipo_anzuelo = this.tipo_anzuelo;
            object.tamano_anzuelo = this.tamano_anzuelo;
            object.cantidad_anzuelos = this.cantidad_anzuelos;
            object.longitud_linea_madre = this.longitud_linea_madre;
            object.material_linea_madre = this.material_linea_madre;
            object.material_bajantes = this.material_bajantes;
            object.otro_material_bajantes = this.otro_material_bajantes;
            object.cantidad_total_lineas = this.cantidad_total_lineas;
            object.denominacion_alerta = this.denominacion_alerta;
            object.otra_denominacion_del_arte = this.otra_denominacion_del_arte;
            object.cantidad_trampas_nasas = this.cantidad_trampas_nasas;
            object.material_ppal_trampas = this.material_ppal_trampas;
            object.otro_material_ppal = this.otro_material_ppal;
            object.tipo_artefactos = this.tipo_artefactos;
            object.otro_tipo_artefacto = this.otro_tipo_artefacto;
            object.cantidad_artefactos = this.cantidad_artefactos;
            object.material_artefacto = this.material_artefacto;
            object.otro_material_artefacto = this.otro_material_artefacto;
            object.uso_dispositivos = this.uso_dispositivos;
            object.tipo_fad_usados = this.tipo_fad_usados;
            object.otro_tipo_fad_usados = this.otro_tipo_fad_usados;
            object.cantidad_fad_usados = this.cantidad_fad_usados;
            object.componentes_fad = this.componentes_fad;
            //tab6
            object.cartas_navegacion = this.cartas_navegacion;
            object.compas_magnetico = this.compas_magnetico;
            object.gps = this.gps;
            object.loran = this.loran;
            object.radar = this.radar;
            object.ecosonda = this.ecosonda;
            object.radios_comunicacion = this.radios_comunicacion;
            //tab 7
            object.firma_representante = this.firma_representante;
            object.fotos_embarcacion = this.fotos_embarcacion;
            object.observations = this.observations;
            object.status = 1;
            //news
            object.calado = this.calado;
            object.otro_material_casco = this.otro_material_casco;
            object.otra_unidad_potencia = this.otra_unidad_potencia;
            object.otro_tipo_conservacion = this.otro_tipo_conservacion;
            object.radicado = this.radicado;
            object.codigo_verificacion = this.codigo_verificacion;
            object.nombre_propietario = this.nombre_propietario;
            object.tipo_identificacion = this.tipo_identificacion;
            object.otro_tipo_identificacion = this.otro_tipo_identificacion;
            object.numero_identificacion = this.numero_identificacion;
            object.nombre_representante = this.nombre_representante;
            object.tipo_identificacion_representante = this.tipo_identificacion_representante;
            object.otro_tipo_identificacion_representante = this.otro_tipo_identificacion_representante;
            object.numero_identificacion_representante = this.numero_identificacion_representante;
            object.cargo_representante = this.cargo_representante;
            object.artes_de_pesca = this.artes_de_pesca;
            object.otro_arte_pesca = this.otro_arte_pesca;

            object.puerto_desembarque = this.puerto_desembarque;
            object.otro_puerto_desembarque = this.otro_puerto_desembarque;

            this.dataStorage.push(object);

        } else {

            let items = this.dataStorage.filter((item) => {
                return item.id === this.id;
            });

            items.forEach((data) => {
                //tab 1
                data.lugar = this.lugar;
                data.fecha_expedicion = this.fecha_expedicion;
                //tab 2
                data.permisionario = this.permisionario;
                data.nit = this.nit;
                //tab 3
                data.nombre_barco = this.nombre_barco;
                data.numero_matricula =  this.numero_matricula ? this.numero_matricula.toUpperCase() : null;
                data.lugar_matricula = this.lugar_matricula;
                data.fecha_matricula = this.fecha_matricula;
                data.vencimiento_matricula = this.vencimiento_matricula;
                //tab 4
                data.bandera = this.bandera;
                data.puerto_registro = this.puerto_registro;
                data.otro_puerto_registro = this.otro_puerto_registro;
                
                data.tipo_barco = this.tipo_barco;
                data.otro_tipo_barco = this.otro_tipo_barco;
                data.valor_embarcacion = this.valor_embarcacion;
                data.venta_productos_a = this.venta_productos_a;
                //tab 5
                data.eslora = this.eslora;
                data.manga = this.manga;
                data.tonelaje = this.tonelaje;
                data.tonelaje_registro_bruto = this.tonelaje_registro_bruto;
                data.potencia_motor_ppal = this.potencia_motor_ppal;
                data.unidad_potencia = this.unidad_potencia;
                data.material_casco = this.material_casco;
                data.numero_bodegas = this.numero_bodegas;
                data.alto_bodegas = this.alto_bodegas;
                data.largo_bodegas = this.largo_bodegas;
                data.ancho_bodegas = this.ancho_bodegas;
                data.capacidad_bodegas = this.capacidad_bodegas;
                data.tipo_conservacion = this.tipo_conservacion;
                data.nombre_admin_agencia = this.nombre_admin_agencia;
                data.numero_tripulantes = this.numero_tripulantes;
                data.numero_pescadores = this.numero_pescadores;
                data.valor_arte_pesca = this.valor_arte_pesca;
                data.zona_pesca = this.zona_pesca;
                data.denominacion_arte_pesca = this.denominacion_arte_pesca;
                data.otra_denominacion_arte_pesca = this.otra_denominacion_arte_pesca;
                data.tipo_anzuelo = this.tipo_anzuelo;
                data.tamano_anzuelo = this.tamano_anzuelo;
                data.cantidad_anzuelos = this.cantidad_anzuelos;
                data.longitud_linea_madre = this.longitud_linea_madre;
                data.material_linea_madre = this.material_linea_madre;
                data.material_bajantes = this.material_bajantes;
                data.otro_material_bajantes = this.otro_material_bajantes;
                data.cantidad_total_lineas = this.cantidad_total_lineas;
                data.denominacion_alerta = this.denominacion_alerta;
                data.otra_denominacion_del_arte = this.otra_denominacion_del_arte;
                data.cantidad_trampas_nasas = this.cantidad_trampas_nasas;
                data.material_ppal_trampas = this.material_ppal_trampas;
                data.otro_material_ppal = this.otro_material_ppal;
                data.tipo_artefactos = this.tipo_artefactos;
                data.otro_tipo_artefacto = this.otro_tipo_artefacto;
                data.cantidad_artefactos = this.cantidad_artefactos;
                data.material_artefacto = this.material_artefacto;
                data.otro_material_artefacto = this.otro_material_artefacto;
                data.uso_dispositivos = this.uso_dispositivos;
                data.tipo_fad_usados = this.tipo_fad_usados;
                data.otro_tipo_fad_usados = this.otro_tipo_fad_usados;
                data.cantidad_fad_usados = this.cantidad_fad_usados;
                data.componentes_fad = this.componentes_fad;
                //tab6
                data.cartas_navegacion = this.cartas_navegacion;
                data.compas_magnetico = this.compas_magnetico;
                data.gps = this.gps;
                data.loran = this.loran;
                data.radar = this.radar;
                data.ecosonda = this.ecosonda;
                data.radios_comunicacion = this.radios_comunicacion;
                //tab 7
                data.firma_representante = this.firma_representante;
                data.fotos_embarcacion = this.fotos_embarcacion;
                data.observations = this.observations;
                data.status = 1;
                //news
                data.calado = this.calado;
                data.otro_material_casco = this.otro_material_casco;
                data.otra_unidad_potencia = this.otra_unidad_potencia;
                data.otro_tipo_conservacion = this.otro_tipo_conservacion;
                data.radicado = this.radicado;
                data.codigo_verificacion = this.codigo_verificacion;
                data.nombre_propietario = this.nombre_propietario;
                data.tipo_identificacion = this.tipo_identificacion;
                data.otro_tipo_identificacion = this.otro_tipo_identificacion;
                data.numero_identificacion = this.numero_identificacion;
                data.nombre_representante = this.nombre_representante;
                data.tipo_identificacion_representante = this.tipo_identificacion_representante;
                data.otro_tipo_identificacion_representante = this.otro_tipo_identificacion_representante;
                data.numero_identificacion_representante = this.numero_identificacion_representante;
                data.cargo_representante = this.cargo_representante;
                data.artes_de_pesca = this.artes_de_pesca;
                data.otro_arte_pesca = this.otro_arte_pesca;

                data.puerto_desembarque = this.puerto_desembarque;
                data.otro_puerto_desembarque = this.otro_puerto_desembarque;
            });
        }

        await Preferences.set({
            key: 'dataRegistersIndustrial',
            value: JSON.stringify(this.dataStorage),
        }).then(() => {
            this.AlertStore();
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
                        this.actualTab = 0;
                        this.counter = 0;
                        this.searchBoat = false;
                        this.matricula_search = null;
                        this.events.publish('updateRegisters', []);
                        this.router.navigate(["registers"]);
                    }
                }
            ]
        });

        await alert.present();
    }

    //validate fields
    inputValidator(event: any) {
        //console.log(event.target.value);
        const pattern = /^[a-zA-Z0-9]*$/;
        //let inputChar = String.fromCharCode(event.charCode)
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
            // invalid character, prevent input

        }
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

    //calculate size storage
    calculateSize() {

        var largo = this.largo_bodegas || 0;
        var alto = this.alto_bodegas || 0;
        var ancho = this.ancho_bodegas || 0;

        this.capacidad_bodegas = Number(largo * alto * ancho);
    }

    //delete images
    deleteImages = (index) => {
        console.log('index: ', index)
        this.fotos_embarcacion.splice(index, 1);
    }

    //search validate
    validateSearch(){

        if(this.matricula_search.length < 4){
            this.presentMessage('Advertencia', 'Debe envíar un número de matricula mayor o igual a 5 carácteres.');
            return;
        }

        const logCurrentNetworkStatus = async () => {

            const status = await Network.getStatus();
            //console.log(status);
            
            if(status.connected === true){
                
                this.searchVessel();

            }else{
                this.searchBoat = true;
                this.presentMessage('Advertencia', 'No es posible realizar la búsqueda, conéctese a internet o realice un nuevo registro');
            }
        };

        logCurrentNetworkStatus();
    }

    //search vessel
    async searchVessel(){


        const loading = await this.loadingController.create({
            message: 'Cargando...',
            spinner: 'crescent',
            showBackdrop: true,
        });

        await loading.present();

        console.log(this.matricula_search)
        
        this.api.searchVessel("Bearer " + this.userToken, this.matricula_search+"/ind").subscribe(response => {    
            loading.dismiss();   

            console.log("Response: ", response)

            if( response[0].data[0].type_boat == 'IND'){
        
                this.searchBoat = true;

                if(response[0] && response[0].data && response[0].data[0]){

                    let imagesArray = []; //images
                    if(response[0].data[0].images && response[0].data[0].images.length>0){
                        response[0].data[0].images.map( data => {
                            imagesArray.push({
                                image: data.nombre,
                            });
                        });
                    }
    
                    //tab 1
                    this.lugar = response[0].data[0].lugar;
    
                    console.log(this.lugar)
    
                    this.fecha_expedicion = response[0].data[0].fecha_expedicion;
                    //tab 2
                    // this.permisionario = response[0].data[0].nombre_propietario;
                    this.permisionario = response[0].data[0].permisionario;
                    this.nit = response[0].data[0].nit;
                    //tab 3
                    this.nombre_barco = response[0].data[0].nombre_barco;
                    this.numero_matricula = response[0].data[0].numero_matricula;
                    this.lugar_matricula = response[0].data[0].lugar_matricula;
                    this.fecha_matricula = response[0].data[0].fecha_matricula;
                    this.vencimiento_matricula = response[0].data[0].vencimiento_matricula;
                    //tab 4
                    this.bandera = response[0].data[0].bandera;
                    this.puerto_registro = response[0].data[0].puerto_registro;
    
                    // this.otro_puerto_registro = response[0].data[0].otro_puerto_registro;
                    this.otro_puerto_registro = this.portsRegister[17].nombre;
                    this.tipo_barco = response[0].data[0].tipo_barco;
    
    
                    this.otro_tipo_barco = response[0].data[0].otro_tipo_barco;
                    this.valor_embarcacion = response[0].data[0].valor_embarcacion;
                    this.venta_productos_a = response[0].data[0].venta_productos_a;
                    //tab 5
                    this.calado = response[0].data[0].calado;
                    this.eslora = response[0].data[0].eslora;
                    this.manga = response[0].data[0].manga;
                    this.tonelaje = response[0].data[0].tonelaje;
                    this.tonelaje_registro_bruto = response[0].data[0].tonelaje_registro_bruto;
                    this.potencia_motor_ppal = response[0].data[0].potencia_motor_ppal;
                    this.unidad_potencia = response[0].data[0].unidad_potencia;
                    this.material_casco = response[0].data[0].material_casco;
                    this.numero_bodegas = response[0].data[0].numero_bodegas;
                    this.alto_bodegas = response[0].data[0].alto_bodegas;
                    this.largo_bodegas = response[0].data[0].largo_bodegas;
                    this.ancho_bodegas = response[0].data[0].ancho_bodegas;
                    this.capacidad_bodegas = response[0].data[0].capacidad_bodegas;
                    this.tipo_conservacion = response[0].data[0].tipo_conservacion;
                    this.nombre_admin_agencia = response[0].data[0].nombre_admin_agencia;
                    this.numero_tripulantes = response[0].data[0].numero_tripulantes;
                    this.numero_pescadores = response[0].data[0].numero_pescadores;
                    this.valor_arte_pesca = response[0].data[0].valor_arte_pesca;
                    this.zona_pesca = response[0].data[0].zona_pesca;
                    this.denominacion_arte_pesca = response[0].data[0].denominacion_arte_pesca;
                    this.otra_denominacion_arte_pesca = response[0].data[0].otra_denominacion_arte_pesca;
                    this.tipo_anzuelo = response[0].data[0].tipo_anzuelo;
                    this.tamano_anzuelo = response[0].data[0].tamano_anzuelo;
                    this.cantidad_anzuelos = response[0].data[0].cantidad_anzuelos;
                    this.longitud_linea_madre = response[0].data[0].longitud_linea_madre;
                    this.material_linea_madre = response[0].data[0].material_linea_madre;
                    this.material_bajantes = response[0].data[0].material_bajantes;
                    this.otro_material_bajantes = response[0].data[0].otro_material_bajantes;
                    this.cantidad_total_lineas = response[0].data[0].cantidad_total_lineas;
                    this.denominacion_alerta = response[0].data[0].denominacion_alerta;
                    this.otra_denominacion_del_arte = response[0].data[0].otra_denominacion_del_arte;
                    this.cantidad_trampas_nasas = response[0].data[0].cantidad_trampas_nasas;
                    this.material_ppal_trampas = response[0].data[0].material_ppal_trampas;
                    this.otro_material_ppal = response[0].data[0].otro_material_ppal;
                    this.tipo_artefactos = response[0].data[0].tipo_artefactos;
                    this.otro_tipo_artefacto = response[0].data[0].otro_tipo_artefacto;
                    this.cantidad_artefactos = response[0].data[0].cantidad_artefactos;
                    this.material_artefacto = response[0].data[0].material_artefacto;
                    this.otro_material_artefacto = response[0].data[0].otro_material_artefacto;
                    this.uso_dispositivos = response[0].data[0].uso_dispositivos;
                    this.tipo_fad_usados = response[0].data[0].tipo_fad_usados;
                    this.otro_tipo_fad_usados = response[0].data[0].otro_tipo_fad_usados;
                    this.cantidad_fad_usados = response[0].data[0].cantidad_fad_usados;
                    this.componentes_fad = response[0].data[0].componentes_fad;
                    //tab6
                    this.cartas_navegacion = response[0].data[0].cartas_navegacion;
                    this.compas_magnetico = response[0].data[0].compas_magnetico;
                    this.gps = response[0].data[0].gps;
                    this.loran = response[0].data[0].loran;
                    this.radar = response[0].data[0].radar;
                    this.ecosonda = response[0].data[0].ecosonda;
                    this.radios_comunicacion = response[0].data[0].radios_comunicacion;
                    //tab 7
                    this.firma_representante = response[0].data[0].firma_representante;
                    this.fotos_embarcacion = imagesArray;
                    this.observations = response[0].data[0].observations;
                    //new
                    this.nombre_propietario = response[0].data[0].nombre_propietario;
                    this.tipo_identificacion = response[0].data[0].tipo_identificacion;
                    this.otro_tipo_identificacion = response[0].data[0].otro_tipo_identificacion;
                    this.numero_identificacion = response[0].data[0].numero_identificacion;
                    //nuevos
                    this.calado = response[0].data[0].calado;
                    this.otro_material_casco = response[0].data[0].otro_material_casco;
                    this.otra_unidad_potencia = response[0].data[0].otra_unidad_potencia;
                    this.otro_tipo_conservacion = response[0].data[0].otro_tipo_conservacion;
                    this.radicado = response[0].data[0].radicado;
                    this.codigo_verificacion = response[0].data[0].codigo_verificacion;
                    this.nombre_representante = response[0].data[0].nombre_representante;
                    this.tipo_identificacion_representante = response[0].data[0].tipo_identificacion_representante;
                    this.otro_tipo_identificacion_representante = response[0].data[0].otro_tipo_identificacion_representante;
                    this.numero_identificacion_representante = response[0].data[0].numero_identificacion_representante;
                    this.cargo_representante = response[0].data[0].cargo_representante;
                    this.artes_de_pesca = response[0].data[0].fishing_arts;
                    this.otro_arte_pesca = response[0].data[0].otro_arte_pesca;
                    this.puerto_desembarque = response[0].data[0].puerto_desembarque;
                    this.otro_puerto_desembarque = response[0].data[0].otro_puerto_desembarque;
    
                    this.presentMessage('Resultado exitoso', 'REGISTRO ENCONTRADO'); 
    
                }
            }
            else{
                this.searchBoat = false;
                this.presentMessage('Advertencia', 'REGISTRO NO ENCONTRADO'); 
            }

        }, err => {
            loading.dismiss();
            this.presentMessage('Advertencia', 'No podemos establecer conexión con el servidor, por favor cierre y vuelva a iniciar sesión e intente de nuevo');
        });
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