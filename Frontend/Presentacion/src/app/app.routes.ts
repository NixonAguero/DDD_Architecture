import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent : () => import('../app/features/subscripciones/page-subscripcion').then(m => m.PageSubscripcion)
    }
];
