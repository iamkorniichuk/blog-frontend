import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface Link {
  title: string;
  href: string;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
})
export class BreadcrumbsComponent implements OnInit {
  private router = inject(Router);
  private url = signal(this.router.url);
  links = computed(() => this.buildBreadcrumbs(this.url()));

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.url.set(event.urlAfterRedirects));
  }

  private buildBreadcrumbs(url: string): Link[] {
    const segments = url.split('/').filter(Boolean);
    let currentPath = '';

    const results = [
      {
        title: 'Home',
        href: '/',
      },
    ];
    for (const obj of segments) {
      currentPath += `/${obj}`;
      results.push({
        title: this.formatTitle(obj),
        href: currentPath,
      });
    }
    return results;
  }

  private formatTitle(segment: string): string {
    return segment.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
