import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  //opened: boolean = true;
  menuList: any = [
    {
      text: 'Reports',
      icon: 'assessment',
      routerLink: '/reports',
      children: [
        {
          text: 'WeeklySummaryReport',
          icon: 'date_range',
          routerLink: '/summary-report',
        },
        {
          text: 'ContributionReport',
          icon: 'co_present',
          routerLink: '/ContributionReport',
        },
        {
          text: 'ProfitCentreReport',
          icon: 'query_stats',
          routerLink: '/ProfitCentreActivitySummaryReport',
        },
        {
          text: 'ResourceActivity',
          icon: 'perm_identity',
          routerLink: '/ResourceRelatedActivity',
        },
        {
          text: 'NonResourceActivity',
          icon: 'person_off',
          routerLink: '/NonResourceRelatedActivity',
        },
        {
          text: 'PayrollCosts',
          icon: 'payments',
          routerLink: '/PayrollCosts',
        },
      ],
    },
    {
      text: 'Roster',
      icon: 'list_alt',
      routerLink: '/roster',
    },
    {
      text: 'Master Data',
      icon: 'dataset',
      routerLink: '/masterdata',

      children: [
        {
          text: 'Group',
          icon: 'group',
          routerLink: '/group',
        },
        {
          text: 'Company',
          icon: 'account_balance',
          routerLink: '/company',
        },

        {
          text: 'Currency',
          icon: 'account_balance',
          routerLink: '/currency',
        },
        {
          text: 'Profit Center',
          icon: 'multiline_chart',
          routerLink: '/profitCenter',
        },
        {
          text: 'Cost Center',
          icon: 'money',
          routerLink: '/costCenter',
        },
        {
          text: 'Customer',
          icon: 'person',
          routerLink: '/customer',
        },
        {
          text: 'Resource',
          icon: 'perm_identity',
          routerLink: '/resource',
        },
        {
          text: 'Project',
          icon: 'domain',
          routerLink: '/project',
        },
        {
          text: 'Project Pricing',
          icon: 'account_balance',
          routerLink: '/projectPrice',
        },
        {
          text: 'Cost Group',
          icon: 'attach_money',
          routerLink: '/costGroup',
        },
        {
          text: 'Cost Element',
          icon: 'monetization_on',
          routerLink: '/costElement',
        },
      ],
    },
  ];
  mode: MatDrawerMode = this.breakpointObserver.isMatched('(min-width: 1024px)')
    ? 'side'
    : 'over';
  isSidenavOpened: boolean = this.mode === 'side' ? true : false;

  @ViewChild(MatSidenav) sidenav?: MatSidenav;
  @ViewChild(MatExpansionPanel) matExpansionPanel?: MatExpansionPanel;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe('(min-width: 1024px)')
      .subscribe((result) => {
        const res = result.matches ? 'side' : 'over';
        this.mode = res;
        if (res === 'side') {
          this.isSidenavOpened = true;
        } else {
          this.isSidenavOpened = false;
        }
      });
  }

  ngOnInit() {}
}
