import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-online-event-link-form',
  templateUrl: './online-event-link-form.component.html',
  styleUrls: ['./online-event-link-form.component.scss']
})
export class OnlineEventLinkFormComponent implements OnInit {

  @Input('platform') label = '';
  @Output('onSubmit') submit = new EventEmitter<any>();

  onlinePlatformCreationForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    url: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required])
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    // console.log('Form value ', this.onlinePlatformCreationForm.value); return;
    if (this.onlinePlatformCreationForm.valid) {
      this.onlinePlatformCreationForm.value.platformName = this.label;
      console.log('Form valid', this.onlinePlatformCreationForm.value);
      this.submit.emit(this.onlinePlatformCreationForm.value);
    } else {
      console.log('Form invalid');

      this.submit.emit('onlinePlatformCreationForm error');
    }
  }
}
