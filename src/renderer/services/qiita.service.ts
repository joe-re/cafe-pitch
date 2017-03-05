import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import QiitaArticle from '../../types/qiita_article';

@Injectable()
export class QiitaService {
    constructor(private http: Http) {}
    get(url: string) {
        return this.http.get(url).map(response => response.json().data as QiitaArticle)
    }
}