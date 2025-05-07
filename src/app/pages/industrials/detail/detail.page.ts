import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/config/events';
import SignaturePad from 'signature_pad';
import { Preferences } from '@capacitor/preferences';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})

export class DetailPage implements OnInit {

    @ViewChild('signaturePad') signaturePad : ElementRef;
    signatureForm: SignaturePad;
    
    public dataStorage: any[] = [];
    id: any = this.activatedRoute.snapshot.paramMap.get('id');;
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
    alto_bodegas: any;
    largo_bodegas: any;
    ancho_bodegas: any;
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
    signature: any;
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
        this.loadForm();
    }

    async loadForm(){

        let dataRegisters = await Preferences.get({ key: 'dataRegistersIndustrial' });
        let response = JSON.parse(dataRegisters.value);

        if (response) {

            this.dataStorage = response;

            if (this.id != 0) {

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
                    this.status = data.status;
                    this.signature = data.signature;
                    //new
                    this.calado = data.calado;
                    this.otra_unidad_potencia = data.otra_unidad_potencia;
                    this.otro_material_casco = data.otro_material_casco;
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
            key: 'dataRegistersIndustrial',
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
