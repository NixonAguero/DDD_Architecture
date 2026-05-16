import {Component, EventEmitter, Input, Output, model} from '@angular/core';
import { Subscripcion } from '../../models/subscripcion.model';

@Component({
    selector : 'app-modal-confirmacion',
    standalone : true,
    templateUrl : './modal-confirmacion.html',
    styleUrl : './modal-confirmacion.css'
})
export class ModalConfirmacion{

    subscripcionEliminar = model<Subscripcion | null>(null);
    isOpen = model<boolean>(false);
    
    @Output() confirmarEliminar = new EventEmitter<any>();
    
    onConfirmar(){
        const id = this.subscripcionEliminar()?.Id;
        if(id){
            this.confirmarEliminar.emit(id);
        }
    }

    onClose(){
        this.isOpen.set(false);
        this.subscripcionEliminar.set(null);
    }

}
