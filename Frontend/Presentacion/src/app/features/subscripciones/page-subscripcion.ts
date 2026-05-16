import { Component, inject } from "@angular/core";
import { SubscripcionServicio } from "./servicios/subscripcion.servicio";
import { SubscripcionTabla } from "./componentes/subscripcion-tabla/subscripcion-tabla";
import { Subscripcion } from "../../models/subscripcion.model";
import { ModalConfirmacion } from "../../shared/modal-confirmacion/modal-confirmacion";
import { SubscripcionForm } from "./componentes/subscripcion-form/subscripcion-form";

@Component({
    selector : 'app-page-subscripcion',
    standalone : true,
    templateUrl : './page-subscripcion.html',
    styleUrl : './page-subscripcion.css',
    imports: [SubscripcionTabla, ModalConfirmacion, SubscripcionForm]
})
export class PageSubscripcion{

    private subscripcionServicio = inject(SubscripcionServicio);
    subscripciones : Subscripcion[] = [];
    modalEliminar : boolean = false;
    modalVer : boolean = false;
    subscripcionSeleccionada : Subscripcion | null = null;
    isEditar : boolean = false;
    isCrear : boolean = false;
    isVer : boolean = false;

    ngOnInit(){
        this.cargarSubscripciones();
    }

    cargarSubscripciones(){
        this.subscripcionServicio.obtenerSubscripciones().subscribe({
            next: (response) => {
                this.subscripciones = response;
            },
            error: () => {
                this.subscripciones = [];
                console.error('Error consultando las subscripciones');
            }
        });
    }

    onVer(subscripcion : Subscripcion){
        this.subscripcionSeleccionada = subscripcion;
        this.isVer = true;
        this.isCrear = false;
        this.isEditar = false;
        this.modalVer = true;
    }

    onCrear(){
        this.subscripcionSeleccionada = null;
        this.isCrear = true;
        this.isEditar = false;
        this.isVer = false;
        this.modalVer = true;
    }

    onEliminar(subscripcion : Subscripcion){
        this.subscripcionSeleccionada = subscripcion;
        this.modalEliminar = true;
    }

    confirmarEliminacion(id : number){
        this.subscripcionServicio.eliminarSubscripcion(id).subscribe({
            next:(response) => {
                this.subscripcionSeleccionada = null;
                this.modalEliminar = false;
            },
            error : (err) => {

            }
        });
        
    }

    onEditar(subscripcion : Subscripcion){
        this.subscripcionSeleccionada = subscripcion;
        this.isEditar = true;
        this.isCrear = false;
        this.isVer = false;
        this.modalVer = true;
    }

    guardarSubscripcion(subscripcion : Subscripcion){
        
        if(this.isCrear){
            this.subscripcionServicio.crearSubscripcion(subscripcion).subscribe({
                next : (response) => {

                },
                error : (err) => {

                }
            })
        }

        if(this.isEditar){
            this.subscripcionServicio.editarSubscripcion(subscripcion).subscribe({
                next : (respones) => {

                }, 
                error : (err) => {
                    
                }
            })
        }

        this.subscripcionSeleccionada = null;
        this.isCrear = false;
        this.isEditar = false;
        this.isVer = false;
    }

}
