// front/src/app/word.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiUrl = 'http://localhost:3000/api/dictionary';

  constructor(private http: HttpClient) { }

  searchWord(word: string, page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${word}`, { params: { page } });
  }

}
