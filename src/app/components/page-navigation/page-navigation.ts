import { Component, effect, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { IconComponent } from '../icon/icon';
import { MetaService } from '../../services/meta';

@Component({
  selector: 'app-page-navigation',
  imports: [IconComponent, RouterLink],
  templateUrl: './page-navigation.html',
})
export class PageNavigationComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private metaService = inject(MetaService);

  private page$ = this.route.queryParamMap.pipe(
    map((params) => {
      const value = params.get('page') || '1';
      return Number(value);
    }),
  );
  private page = toSignal(this.page$, { initialValue: 1 });

  total = input.required<number>();
  pageChange = output<number>();
  current = signal<number>(1);

  constructor() {
    effect(() => {
      const page = Math.max(this.page(), 1);
      const current = Math.min(page, this.total());

      this.current.set(current);
      this.setTags(current);
      this.pageChange.emit(current);
    });
  }

  private setTags(page: number) {
    if (page > 1) {
      const previousUrl = this.getPageUrl(page - 1).toString();
      this.metaService.setTag({ rel: 'prev', href: previousUrl });
    } else {
      this.metaService.deleteTag({ rel: 'prev' });
    }

    if (page < this.total()) {
      const nextUrl = this.getPageUrl(page + 1).toString();
      this.metaService.setTag({ rel: 'next', href: nextUrl });
    } else {
      this.metaService.deleteTag({ rel: 'next' });
    }
  }

  getPageUrl(page: number) {
    return this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  get pageNumbers() {
    const neighbors = 2;
    const pages: (number | null)[] = [1];

    const start = Math.max(2, this.current() - neighbors);
    const end = Math.min(this.total() - 1, this.current() + neighbors);

    if (start > 2) pages.push(null);

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < this.total() - 1) pages.push(null);

    if (this.total() > 1) pages.push(this.total());

    return pages;
  }
}
