import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TodoServerService {
  server: any;
  serverUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  connect(): Observable<any[]> {
    console.log("Connecting...");

    return this.http.get<any[]>(this.serverUrl).pipe(catchError(this.handleError<any[]>("getHeroes", [])));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
