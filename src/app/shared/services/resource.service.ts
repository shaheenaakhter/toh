import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Resource } from 'src/app/model/resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceService<T extends Resource>{

   
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private url: string) { }

  /** GET heroes from the server */
  getItems (): Observable<T[]> {
    return this.http.get<T[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<T[]>('getItems',[]))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getItemNo404<Data>(id: number): Observable<T> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<T>(url)
      .pipe(
        map(T => T[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} item id=${id}`);
        }),
        catchError(this.handleError<T>(`getItem id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getItem(id: number): Observable<T> {
    const url = `${this.url}/${id}`;
    return this.http.get<T>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<T>(`getItem id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchItems(term: string): Observable<T[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<T[]>(`${this.url}/?name=${term}`).pipe(
      tap(_ => this.log(`found items matching "${term}"`)),
      catchError(this.handleError<T[]>('searchItems', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addItem (item: T): Observable<T> {
    return this.http.post<T>(this.url, item, this.httpOptions).pipe(
      tap((newItem: T) => this.log(`added item w/ id=${newItem.id}`)),
      catchError(this.handleError<T>('addItem',item))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteItem (item: T | number): Observable<T> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<T>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<T>('deleteItem'))
    );
  }

  /** PUT: update the hero on the server */
  updateItem (item: T): Observable<T> {
    return this.http.put(this.url, item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
