import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs';

import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { RouteMeta, MetaService } from './services/meta';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  providers: [DatePipe],
})
export class App {
  protected readonly title = signal('blog');
  private metaService = inject(MetaService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const route = this.findDeepestRoute(this.activatedRoute);
        const metaData = route.snapshot.data as RouteMeta;
        this.metaService.setRouteMeta(metaData);

        const rawUrl = e.urlAfterRedirects || e.url;
        const cleanUrl = rawUrl.split('?')[0].split('#')[0];
        const path = this.normalizePath(cleanUrl);
        const canonical = `https://www.returnsnull.dev${path}`;
        this.metaService.setCanonical(canonical);
      });
  }

  private normalizePath(path: string): string {
    if (!path.startsWith('/')) path = '/' + path;

    path.replaceAll('\\', '/');

    if (path.endsWith('/')) path = path.slice(0, -1);
    return path;
  }

  private findDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) route = route.firstChild;
    return route;
  }
}
