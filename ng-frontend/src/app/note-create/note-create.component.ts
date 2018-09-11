import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators } from '@angular/forms'
import { FlashMessagesService } from 'angular2-flash-messages';
import { NoteService } from '../services/note/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {

  createForm:FormGroup;
  title: String;
  body: String;
  user_id = JSON.parse(localStorage.getItem('user'));
  val: any;

  constructor(private noteService: NoteService, private flashMessage: FlashMessagesService, private router: Router) { 

  }

  ngOnInit() {

  }

  noteSubmit() {
    const note = { title: this.title, body: this.body, user_id: this.user_id.id };

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
  }
}
