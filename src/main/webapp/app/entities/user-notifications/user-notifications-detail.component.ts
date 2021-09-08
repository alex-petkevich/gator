import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserNotifications } from 'app/shared/model/user-notifications.model';

@Component({
  selector: 'jhi-user-notifications-detail',
  templateUrl: './user-notifications-detail.component.html'
})
export class UserNotificationsDetailComponent implements OnInit {
  userNotifications: IUserNotifications;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userNotifications }) => {
      this.userNotifications = userNotifications;
    });
  }

  previousState() {
    window.history.back();
  }
}
