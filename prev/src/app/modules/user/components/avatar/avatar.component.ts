import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  thumbnail = 'assets/images/user-avatar.png';

  constructor() { }

  ngOnInit(): void {
  }

}
