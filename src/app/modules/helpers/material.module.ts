import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatRadioModule } from "@angular/material/radio";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from "@angular/material/tabs";
import { MatSortModule } from "@angular/material/sort";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatTooltipModule,MatSlideToggleModule,
    MatToolbarModule, MatInputModule,MatDatepickerModule,MatNativeDateModule,MatTabsModule,MatSortModule,
    MatCardModule, MatMenuModule, MatIconModule, MatDialogModule,MatSnackBarModule,MatSidenavModule,
    MatListModule, MatToolbarModule, MatIconModule,MatRadioModule,MatTableModule,MatPaginatorModule,MatSelectModule,
    MatExpansionModule, MatProgressSpinnerModule],
  exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatTooltipModule, MatSlideToggleModule,
    MatToolbarModule, MatInputModule,MatDatepickerModule,MatNativeDateModule,MatTabsModule,MatSortModule,
    MatCardModule, MatMenuModule, MatIconModule, MatDialogModule,MatSnackBarModule,MatSidenavModule,
    MatListModule, MatToolbarModule, MatIconModule,MatRadioModule,MatTableModule,MatPaginatorModule,MatSelectModule,
    MatExpansionModule, MatProgressSpinnerModule]
})


export class MaterialModule{}
