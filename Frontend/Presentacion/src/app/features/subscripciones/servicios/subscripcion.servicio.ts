import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subscripcion } from "../../../models/subscripcion.model";
import { environment } from "../../../../environments/environment-desarrollo";

@Injectable({
    providedIn: 'root'
})
export class SubscripcionServicio {
    private apiUrl = `${environment.apiUrl}/Subscripcion`;

    constructor(private http: HttpClient) { }

    obtenerSubscripciones() {
        return this.http.get<Subscripcion[]>(`${this.apiUrl}`);
    }

    crearSubscripcion(subscripcion: Subscripcion) {
        return this.http.post<Subscripcion>(`${this.apiUrl}`, subscripcion);
    }

    editarSubscripcion(subscripcion: Subscripcion) {
        return this.http.put<Subscripcion>(`${this.apiUrl}`, subscripcion);
    }

    eliminarSubscripcion(id: number) {
        return this.http.delete<Subscripcion>(`${this.apiUrl}/${id}`);
    }

}
