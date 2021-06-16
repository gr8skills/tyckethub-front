import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovieTicketType} from '../../models/enums';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UiService} from '../../core/ui.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-movie-ticket-form',
  templateUrl: './movie-ticket-form.component.html',
  styleUrls: ['./movie-ticket-form.component.scss']
})
export class MovieTicketFormComponent implements OnInit {

  @Input('ticketType') ticketType = MovieTicketType.FREE;
  @Output('onSubmit') submit = new EventEmitter<any>();

  availableTicketTypes = [MovieTicketType.FREE, MovieTicketType.PAID, MovieTicketType.INVITE];
  priceInputDisabled = this.ticketType === this.availableTicketTypes[0] || this.ticketType === this.availableTicketTypes[2];

  formErrorSubject = new Subject();
  formErrorValue$ = this.formErrorSubject.asObservable();

  ticketCreationForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl('', []),
    price: new FormControl(0)
  });

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.ticketCreationForm.valid) {
      this.submit.emit(this.ticketCreationForm.value);
    } else {
      this.formErrorSubject.next(this.ticketCreationForm.errors);
      this.submit.emit(null);
    }
  }

}
