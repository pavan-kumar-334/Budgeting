import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BreadcrumbsService } from './services/breadcrumbs.service';
import { Breadcrumb } from './breadcrumb.model';

@Component({
  selector: 'lib-breadcrumbs',
  template: `
    <ol *ngIf="crumbs$ | async as crumbs" class="breadcrumbs-container">    
        <li>
            <a [routerLink]="['/roster']"><mat-icon class="material-icons-outlined">home</mat-icon></a>
        </li>
        <li *ngFor="let crumb of crumbs; let last = last"
          [ngClass]="{ 'breadcrumbs-item-active': last }"
          class="breadcrumbs-item"
        >
       <mat-icon *ngIf="crumb.icon" >{{ crumb.icon }}</mat-icon> 
        <a *ngIf="!last" [routerLink]="crumb.path">{{ crumb.text }}</a>

        <span *ngIf="last" class="breadcrumb-label">{{ crumb.text }}</span>
      </li>
    </ol>
  `
})
export class BreadcrumbsComponent {
  public crumbs$: Observable<Breadcrumb[]> = this.breadcrumbsService.getCrumbs();

  constructor(public breadcrumbsService: BreadcrumbsService) { }
}