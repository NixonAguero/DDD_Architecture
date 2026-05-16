import { Component, EventEmitter, Input, Output, model } from "@angular/core";
import { TablaComponente } from "../../../../shared/tabla/tabla";
import { Subscripcion } from "../../../../models/subscripcion.model";
import { TableColumn } from "../../../../models/tabla.model";

@Component({
    selector : 'app-subscripcion-tabla',
    standalone: true,
    templateUrl : './subscripcion-tabla.html',
    imports: [TablaComponente],
})
export class SubscripcionTabla {

    subscripciones  = model<Subscripcion[]>([]);

    @Output() verSubscripcion = new EventEmitter<Subscripcion>();
    @Output() editarSubscripcion = new EventEmitter<Subscripcion>();
    @Output() eliminarSubscripcion = new EventEmitter<Subscripcion>();

    columnas : TableColumn[] = [];

    ngOnInit(){
        this.cargarFormatoColumnas();
    }

    cargarFormatoColumnas(){

        this.columnas = [
            {key : 'TipoSubscripcion', label : 'Tipo de Subscripcion'},
            {key : 'Usuario', label : 'Usuario'},
            {key : 'PrecioBase', label : 'Precio Base'},
            {key : 'FechaInicio', label : 'Fecha de Inicio'},
            {key : 'FechaFin', label : 'Fecha de Fin'},
            {key : 'PrecioTotal', label : 'Precio Total'},
        ];

    }

    onEditar(subscripcion : Subscripcion){
        this.editarSubscripcion.emit(subscripcion)
    }

    onVer(subscripcion : Subscripcion){
        this.verSubscripcion.emit(subscripcion) 
    }

    onEliminar(subscripcion : Subscripcion){
        this.eliminarSubscripcion.emit(subscripcion)
    }

}
