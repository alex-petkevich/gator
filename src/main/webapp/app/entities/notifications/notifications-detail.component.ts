import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INotifications } from 'app/shared/model/notifications.model';

@Component({
  selector: 'jhi-notifications-detail',
  templateUrl: './notifications-detail.component.html'
})
export class NotificationsDetailComponent implements OnInit {
  notifications: INotifications;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ notifications }) => {
      this.notifications = notifications;
    });
  }

  previousState() {
    window.history.back();
  }
}
