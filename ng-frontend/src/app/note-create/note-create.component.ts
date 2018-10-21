import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NoteService } from '../services/note/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  
  selectfile;
  image;
  ntitle: String;
  nbody: String;
  user_id = JSON.parse(localStorage.getItem('user'));
  val: any;

  constructor(private noteService: NoteService, private flashMessage: FlashMessagesService, private router: Router, private http: HttpClient) { 
  }

  ngOnInit() {

  }

  selectFile(event) {
    console.log(event);
    this.selectfile = event.target.files[0];
  }

  noteSubmit() {
    const fd = new FormData();
    fd.append('image', this.selectfile, this.selectfile.name);
    this.http.post('http://localhost:3000/api/upload', fd)
    .subscribe((vals) => {
      this.image = vals;

      const note = {
        title: this.ntitle, 
        body: this.nbody,
        image: this.image.uploadname,
        user_id: this.user_id.id
      };
  
      this.noteService.submitNote(note)
      .subscribe((val) => {
        this.val = val;
        if(this.val.success) {
          this.router.navigate(['/dashboard']);
          this.flashMessage.show('Note Created.', { cssClass: 'alert-success', timeout: 700 });
        } else {
          this.flashMessage.show('Fill all details.', { cssClass: 'alert-danger', timeout: 900 });
        }
      });

    });
    
  }
}
