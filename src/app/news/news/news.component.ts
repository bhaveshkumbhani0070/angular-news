import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {DataSource} from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';

import {Hero} from '../../heroes/shared/hero.model';
import {HeroService} from '../../heroes/shared/hero.service';
import {AppConfig} from '../../config/app.config';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

    heroes: Hero[] = null;
    data=[];
    message:string;

    selectedData=[]
    canVote = false;
    viewDate:Boolean=true;
    selected = 'default';

    dataSource = new UserDataSource(this.heroService);
    constructor(
      private router: Router,
      private heroService: HeroService
    ) {
      this.canVote = this.heroService.checkIfUserCanVote();
      
      // this.heroService.getAllHeroes().subscribe((heroes) => {
      //   this.heroes = heroes.sort((a, b) => {
      //     return b.likes - a.likes;
      //   }).slice(0, AppConfig.topHeroesLimit);
      // });
      
      // this.heroService.getAllData().subscribe((data:Array<Hero>)=>{
      //   console.log('data',data);
      //   this.data=data;
      // }) 
    }
    
    displayedColumns = ['no','date','title'];//type
    
    // dataSource = new MatTableDataSource(this.data);  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngAfterViewInit() {
     // this.dataSource = new MatTableDataSource(this.data);
      // this.dataSource.paginator = this.paginator;
    }

    like(hero: Hero): Promise<any> {
      return new Promise((resolve, reject) => {
        this.heroService.like(hero).subscribe(() => {
          this.canVote = this.heroService.checkIfUserCanVote();
          resolve(true);
        }, (error) => {
          reject(error);
        });
      });
    }
    getContent(d){
      console.log('data',d);
      this.selectedData=d;
      this.heroService.changeMessage(d.contents)
      // this.router.navigate(['content/' + d.no]);
    }
    searchNews(val,field){
      console.log('data',val,' field',field);
      this.dataSource = new UserDataSource(this.heroService);
      
        this.heroService.getSelectedNews(val,field).subscribe((data:Array<Hero>)=>{
          console.log('data',data);
        })
      // getSelectedNews(value,field)
    }
}
export class UserDataSource extends DataSource<any> {
  constructor(private heroService: HeroService) {
    super();
  }
  connect(): Observable<any> {
    return this.heroService.getAllData();
  }
  disconnect() {}
}
