import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageIndexComponent } from './page-index/page-index.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageIndexComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    PageIndexComponent,
    FooterComponent,
    HeaderComponent, 
  ]
})
export class PartialsModule { }
