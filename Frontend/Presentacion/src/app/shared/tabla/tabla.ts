import { Component, Input, Output, EventEmitter, model } from "@angular/core";
import { DatePipe } from "@angular/common";
import { TableColumn } from "../../models/tabla.model";

@Component({
    selector : 'app-tabla',
    standalone: true,
    templateUrl : './tabla.html',
    imports: [DatePipe],
})
export class TablaComponente {
    @Input() columnas : TableColumn[] = [];
    datos = model<any[]>([]);

    @Output() accionVer = new EventEmitter<any>();
    @Output() accionEditar = new EventEmitter<any>();
    @Output() accionEliminar = new EventEmitter<any>();

    onVer(item : any){
        this.accionVer.emit(item);
    }

    onEliminar(item : any){
        this.accionEliminar.emit(item);
    }

    onEditar(item : any){
        this.accionEditar.emit(item);
    }

    esFecha(valor : any){
        return valor instanceof Date || (typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}/.test(valor));
    }
}
