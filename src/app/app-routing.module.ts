import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HeroTopComponent} from './heroes/hero-top/hero-top.component';
import { NewsComponent } from './news/news/news.component';
import { ContentComponent } from './news/content/content.component';

import {AppConfig} from './config/app.config';
import {Error404Component} from './core/error404/error-404.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  // {path: '', component: HeroTopComponent},
  // {path: AppConfig.routes.heroes, loadChildren: 'app/heroes/heroes.module#HeroesModule'},
  
  // News
  {path:'',component:NewsComponent},
  {path:'content',component:ContentComponent},
  {path:'content/:id',component:ContentComponent},

  {path: AppConfig.routes.error404, component: Error404Component},
  // otherwise redirect to 404
  {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
