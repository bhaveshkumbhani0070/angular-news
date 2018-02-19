import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HeroService} from '../../heroes/shared/hero.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(
    private router: Router,
    private heroService: HeroService
  ) { }
  
  viewSelected:any;
  selectedData:any;
  message:string;

  ngOnInit() {
    this.heroService.currentMessage.subscribe(message =>{
      if(message=="false"){
        this.router.navigate(['/']);
      }
      else{
        this.viewSelected=message;
      }
    })
  }

}
