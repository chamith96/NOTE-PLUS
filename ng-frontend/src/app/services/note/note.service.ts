import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  authToken = localStorage.getItem('id_token');

  constructor(private http: HttpClient) { }
  
  submitNote(note){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/api/note/create', note, {headers: headers});
  }

  showAllNotes() {
    let headers = new HttpHeaders();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:3000/api/note', {headers: headers});
  }

  showNoteById(id) {
    return this.http.get('http://localhost:3000/api/note/'+id);
  }

  noteDelete(id) {
    return this.http.delete('http://localhost:3000/api/note/'+id);
  }

  noteEdit(note, id) {
    let headers = new HttpHeaders();
    return this.http.put('http://localhost:3000/api/note/'+id+'/edit', note, {headers: headers});
  }

}