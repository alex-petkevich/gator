import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserProperties } from 'app/shared/model/user-properties.model';

@Component({
  selector: 'jhi-user-properties-detail',
  templateUrl: './user-properties-detail.component.html'
})
export class UserPropertiesDetailComponent implements OnInit {
  userProperties: IUserProperties;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userProperties }) => {
      this.userProperties = userProperties;
    });
  }

  previousState() {
    window.history.back();
  }
}
