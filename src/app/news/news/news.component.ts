import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {HeroService} from '../../heroes/shared/hero.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  displayedColumns = ['no', 'type', 'date', 'title'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  viewDate:Boolean=true;
  selected = 'default';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private heroService: HeroService) {}
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.exampleDatabase!.getRepoIssues('false','false');
        }),
        map(data => {
          this.resultsLength = data.items.length;
          console.log('data',data);
          return data.items;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  searchNews(val,field){
    console.log('data',val,' field',field);
    
     merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.exampleDatabase!.getRepoIssues(val,field);
        }),
        map(data => {
          this.resultsLength = data.items.length;
          console.log('data',data);
          return data.items;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }
  getContent(d){
    console.log('data',d);
    this.heroService.changeMessage(d.contents)
    // this.router.navigate(['content/' + d.no]);
  }
}


export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  type: string;
  no: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getRepoIssues(value: string, field: string): Observable<GithubApi> {
    const href = 'http://localhost:3000/api/news';
    const requestUrl =
        `${href}?value=${value}&field=${field}`;
    return this.http.get<GithubApi>(requestUrl);
  }
}