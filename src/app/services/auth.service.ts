import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TutenUser } from '../models/user.model';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthService {

    endpoint = 'user';

    constructor(
        private http: HttpClient
    ) { }

    public authentication(formUser): Observable<TutenUser> {

        const NAMEUSER = formUser.get('nameUser').value;
        const PASSWORD: string = formUser.get('password').value;
        const APP: string = "APP_BCK";

        const _headers = new HttpHeaders()
            .append('password', PASSWORD.toString())
            .append('app', APP.toString());

        let options = { headers: _headers };

        return this.http.put<TutenUser>(environment.url + this.endpoint + `/${NAMEUSER}`, null, options).pipe(take(1));
    };

}