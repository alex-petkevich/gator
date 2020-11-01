import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProperties } from 'app/shared/model/properties.model';

@Component({
  selector: 'jhi-properties-detail',
  templateUrl: './properties-detail.component.html'
})
export class PropertiesDetailComponent implements OnInit {
  properties: IProperties;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ properties }) => {
      this.properties = properties;
    });
  }

  previousState() {
    window.history.back();
  }
}
