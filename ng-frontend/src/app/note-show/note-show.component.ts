import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { NoteService } from '../services/note/note.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-note-show',
  templateUrl: './note-show.component.html',
  styleUrls: ['./note-show.component.css']
})
export class NoteShowComponent implements OnInit {

  note: any;
  user_id = JSON.parse(localStorage.getItem('user'));

  constructor(private noteService: NoteService, private router: ActivatedRoute, private route: Router,  private flashMessage: FlashMessagesService) { 
    this.noteService.showNoteById(this.router.snapshot.params['id'])
    .subscribe((val) => {  
      this.note = val;
      if(this.note.user_id != this.user_id.id) {
        this.route.navigate(['dashboard']);
      }
    });
  }

  ngOnInit() {
  }

  deleteNote() {
    if(confirm('Are you sure to delete note ?') == true) {
      this.noteService.noteDelete(this.router.snapshot.params['id'])
      .subscribe((val) => {
        this.route.navigate(['dashboard']);
        this.flashMessage.show('Note is deleted.', { cssClass: 'alert-danger', timeout: 700 });
      });
    }
  }
  
}
