import { Component, OnInit, Input } from '@angular/core';

import { Injectable } from '@angular/core';
import { MessageService } from './message.service'; 

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PostsService {

  ngOnInit() {
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
  /** GET heroes from the server */
  getMessages (name, password): Observable<string[]> {
    this.messageService.add('getting messages');
    const url = `${this.serverUrl}/messages`;
    const body =  {name: name, password: password};
    return this.http.get<string[]>(this.serverUrl)
      .pipe(
        tap(heroes => this.log(`fetched messages`)),
        catchError(this.handleError('getMessages', []))
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
