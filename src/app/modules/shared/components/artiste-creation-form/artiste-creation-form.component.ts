import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UiService} from '../../core/ui.service';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-artiste-creation-form',
  templateUrl: './artiste-creation-form.component.html',
  styleUrls: ['./artiste-creation-form.component.scss']
})
export class ArtisteCreationFormComponent implements OnInit {
  // tslint:disable-next-line:no-output-rename
  @Output('onSubmit') submit = new EventEmitter<any>();

  formErrorSubject = new Subject();
  formErrorValue$ = this.formErrorSubject.asObservable();

  artisteCreationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    bio: new FormControl(''),
  });

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }
  save(): void {
    if (this.artisteCreationForm.valid) {
      this.submit.emit(this.artisteCreationForm.value);
    } else {
      this.formErrorSubject.next(this.artisteCreationForm.errors);
      this.submit.emit(null);
    }
  }

}
