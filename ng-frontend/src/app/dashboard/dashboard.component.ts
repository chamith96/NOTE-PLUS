import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note/note.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notes: any;

  constructor(private note: NoteService, private router: Router) {
    this.note.showAllNotes()
    .subscribe(note => {
      this.notes = note;
      console.log(note);
  });
    
  }
  

  ngOnInit() {
  }

}
