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
    const cleanUrl = url.split(/[?#]/)[0];
    const segments = cleanUrl.split('/').filter(Boolean);

    const results: Link[] = [{ title: 'Home', href: '/' }];
    let currentPath = '';

    for (const segment of segments) {
      currentPath += `/${segment}`;
      results.push({
        title: this.formatTitle(segment),
        href: currentPath,
      });
    }

    return results;
  }

  private formatTitle(segment: string): string {
    return segment.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
