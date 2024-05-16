import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/screen1/screen1.component').then(m => m.Screen1Component)
    }, {
        path: 'history',
        loadComponent: () => import('./modules/history/history.component').then(m => m.HistoryComponent)
    }
];
