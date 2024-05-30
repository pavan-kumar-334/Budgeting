import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() matExpansionPanel: EventEmitter<any> = new EventEmitter();
  @Output() sidenav: EventEmitter<any> = new EventEmitter();
  @Input() showCloseNav: any;

  sidenavToggle() {
    this.matExpansionPanel.emit();

    setTimeout(()=>{this.sidenav.emit()},100);
   }

  constructor() { }

  ngOnInit(): void {
  }
  logout( ): void
    {
       
    }


}
