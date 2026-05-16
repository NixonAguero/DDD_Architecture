import { Component, EventEmitter, Output, effect, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Subscripcion } from "../../../../models/subscripcion.model";

type SubscripcionFormData = Omit<Subscripcion, 'FechaInicio' | 'FechaFin'> & {
    FechaInicio: string;
    FechaFin: string;
};

@Component({
    selector : 'app-subscripcion-form',
    standalone : true,
    templateUrl : './subscripcion-form.html',
    styleUrl : './subscripcion-form.css',
    imports: [FormsModule]
})
export class SubscripcionForm{

    isOpen = model<boolean>(false);
    isEditar = model<boolean>(false);
    isCrear = model<boolean>(false);
    isVer = model<boolean>(false);
    detallesSubscripcion = model<Subscripcion | null>(null);

    @Output() guardarSubscripcion = new EventEmitter<Subscripcion>();

    tiposSubcripciones = ["Mensual Bronce", "Mensual Plata", "Mensual Oro", "Mensual Premium", "Anual Premium"];

    formData: SubscripcionFormData = this.crearFormularioVacio();

    constructor(){
        effect(() => {
            if(this.isOpen()){
                this.formData = this.crearFormularioDesdeSubscripcion(this.detallesSubscripcion());
            }
        });
    }

    get titulo(){
        if(this.isVer()){
            return 'Detalle de subscripcion';
        }

        if(this.isEditar()){
            return 'Editar subscripcion';
        }

        return 'Nueva subscripcion';
    }

    get soloLectura(){
        return this.isVer();
    }

    onClose(){
        this.detallesSubscripcion.set(null);
        this.isOpen.set(false);
        this.isCrear.set(false);
        this.isEditar.set(false);
        this.isVer.set(false);
    }

    onSubmit(){
        if(this.soloLectura){
            this.onClose();
            return;
        }

        this.guardarSubscripcion.emit({
            ...this.formData,
            PrecioBase: Number(this.formData.PrecioBase),
            PrecioTotal: Number(this.formData.PrecioTotal),
            FechaInicio: new Date(this.formData.FechaInicio),
            FechaFin: new Date(this.formData.FechaFin)
        });

        this.onClose();
    }

    private crearFormularioVacio(): SubscripcionFormData{
        return {
            Id: 0,
            TipoSubscripcion: '',
            Usuario: '',
            PrecioBase: 0,
            FechaInicio: '',
            FechaFin: '',
            PrecioTotal: 0
        };
    }

    private crearFormularioDesdeSubscripcion(subscripcion: Subscripcion | null): SubscripcionFormData{
        if(!subscripcion){
            return this.crearFormularioVacio();
        }

        return {
            ...subscripcion,
            FechaInicio: this.formatearFechaInput(subscripcion.FechaInicio),
            FechaFin: this.formatearFechaInput(subscripcion.FechaFin)
        };
    }

    private formatearFechaInput(fecha: Date | string): string{
        if(!fecha){
            return '';
        }

        const fechaNormalizada = new Date(fecha);
        return fechaNormalizada.toISOString().slice(0, 10);
    }

}
