import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventTicketType} from '../../models/enums';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UiService} from '../../core/ui.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-event-status-form',
  templateUrl: './event-status-form.component.html',
  styleUrls: ['./event-status-form.component.scss']
})
export class EventStatusFormComponent implements OnInit {

  // tslint:disable-next-line:no-output-rename
  @Output('onSubmit') submit = new EventEmitter<any>();

  formErrorSubject = new Subject();
  formErrorValue$ = this.formErrorSubject.asObservable();

  eventStatusForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private uiService: UiService) {
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.eventStatusForm.valid) {
      this.submit.emit(this.eventStatusForm.value);
    } else {
      this.formErrorSubject.next(this.eventStatusForm.errors);
      this.submit.emit(null);
    }
  }

}
