import { Component, OnInit, Input } from '@angular/core';

import { Injectable } from '@angular/core';
import { MessageService } from './message.service'; 

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
   })
};

@Injectable()
export class UserService {

  ngOnInit() {
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
    /** GET heroes from the server */
    signin (name, password): Observable<string> {
      this.messageService.add('signing in');
      const url = `${this.serverUrl}/signin`;
      const body =  {name: name, password: password};
      return this.http.post<string>(url, body, httpOptions)
        .pipe(
          tap((str: string) => {
            this.log(`signed in ${str}`);
            
          }),
          catchError(this.handleError<string>('signed in'))
        );
    }
    
    /** GET heroes from the server */
    signup (name, password): Observable<string> {
      this.messageService.add('signing up');
      const url = `${this.serverUrl}/signup`;
      const body =  {name: name, password: password};
      return this.http.post<string>(url, body, httpOptions)
        .pipe(
          tap((str: string) => this.log(`signed up ${str}`)),
          catchError(this.handleError<string>('signed up'))
        );
    }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private serverUrl: string = "http://localhost:3000";  // URL to web api

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
    
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
    
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
