import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NoteService } from '../services/note/note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  title: string;
  body: string;
  val: any;
  note: any;
  user_id = JSON.parse(localStorage.getItem('user'));

  constructor(private noteService: NoteService, private flashMessage: FlashMessagesService, private router: Router,private route: ActivatedRoute) { 
    this.noteService.showNoteById(this.route.snapshot.params['id'])
    .subscribe((val) => {  
      this.note = val;
      if(this.note.user_id != this.user_id.id) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  ngOnInit() {
  }

  editNote() {
    const note = {title: this.title, body: this.body};
    this.noteService.noteEdit(note, this.route.snapshot.params['id'])
    .subscribe((val) => {
      this.val = val;
      if(this.val.success) {
        this.router.navigate(['/dashboard']);
        this.flashMessage.show('Note edited.', { cssClass: 'alert-success', timeout: 700 });
      } else {
        this.flashMessage.show('Fill all details.', { cssClass: 'alert-danger', timeout: 500 });
      }
    });
  }

}
