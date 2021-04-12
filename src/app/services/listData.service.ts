import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ListDataService {

    endpoint = 'user';

    constructor(
        private http: HttpClient
    ) { }

    getListData(emailData, adminemail) {
        const PARAMS = new HttpParams()
            .append("current", "true");

        const HEADERS = new HttpHeaders()
            .append('adminemail', adminemail)
            .append('app', 'APP_BCK');

        return this.http.get(environment.url + this.endpoint + `/${emailData}/bookings`, { params: PARAMS, headers: HEADERS }).pipe(take(1));
    }
}