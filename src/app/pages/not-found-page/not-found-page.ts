import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, BreadcrumbsComponent],
  templateUrl: './not-found-page.html',
})
export class NotFoundPageComponent {}
