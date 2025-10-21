import { DatePipe, isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

export interface RouteMeta {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  type: 'article' | 'website';
  createdAt: Date;
  modifiedAt?: Date;
  tags: string[];
  canonicalUrl?: string;
}
export type StaticRouteMeta = Partial<RouteMeta>;

export type DefinitiveKey = 'name' | 'rel' | 'property';
export type DefinitiveMeta = Partial<Record<DefinitiveKey, string>>;

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private documentService = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private datePipe = new DatePipe('en-US');

  private definitiveKeys: DefinitiveKey[] = ['name', 'rel'];

  setRouteMeta(meta: StaticRouteMeta) {
    if (meta.title) {
      this.setTitle(meta.title);
      this.setTag({ name: 'title', property: 'og:title', content: meta.title });
    }

    if (meta.type) this.setTag({ property: 'og:type', content: meta.type });

    if (meta.description)
      this.setTag({ name: 'description', property: 'og:description', content: meta.description });

    if (meta.imageUrl) this.setTag({ property: 'og:image', content: meta.imageUrl });
    if (meta.imageAlt) this.setTag({ property: 'og:image:alt', content: meta.imageAlt });

    const dateScheme = 'yyyy-MM-dd';
    if (meta.createdAt) {
      const createdAtDate = this.datePipe.transform(meta.createdAt, dateScheme) as string;
      this.setTag({ name: 'date', content: createdAtDate, scheme: dateScheme });
      this.setTag({ name: 'created', content: createdAtDate, scheme: dateScheme });
    }
    if (meta.modifiedAt) {
      const modifiedAtDate = this.datePipe.transform(meta.createdAt, dateScheme) as string;
      this.setTag({ name: 'revised', content: modifiedAtDate, scheme: dateScheme });
    }

    if (meta.canonicalUrl) this.setCanonical(meta.canonicalUrl);
    else this.deleteCanonical();

    if (meta.type === 'article') {
      const createdAtIso = meta.createdAt?.toISOString();
      if (createdAtIso)
        this.setTag({ property: 'og:article:published_time', content: createdAtIso });

      const modifiedAtIso = meta.modifiedAt?.toISOString();
      if (modifiedAtIso)
        this.setTag({ property: 'og:article:modified_time', content: modifiedAtIso });

      this.deleteTag({ property: 'og:article:tag' });
      if (meta.tags) {
        for (const tag of meta.tags) {
          this.addTag({ property: 'og:article:tag', content: tag });
        }
      }
    }
  }

  addTag(meta: MetaDefinition & DefinitiveMeta) {
    const definitiveKey = this.findDefinitiveKey(meta);
    if (!definitiveKey) return;

    this.metaService.addTag(meta, true);
  }

  setTag(meta: MetaDefinition & DefinitiveMeta) {
    const definitiveKey = this.findDefinitiveKey(meta);
    if (!definitiveKey) return;

    const selector = `${definitiveKey}="${meta[definitiveKey]}"`;
    this.metaService.updateTag(meta, selector);
  }

  deleteTag(meta: DefinitiveMeta) {
    const definitiveKey = this.findDefinitiveKey(meta);
    if (!definitiveKey) return;

    const selector = `${definitiveKey}="${meta[definitiveKey]}"`;
    const tags = this.metaService.getTags(selector);
    tags.forEach((tag) => this.metaService.removeTagElement(tag));
  }

  private findDefinitiveKey(meta: DefinitiveMeta): DefinitiveKey | undefined {
    return this.definitiveKeys.find((k) => k in meta && !!meta[k]);
  }

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  setCanonical(url: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.deleteCanonical();

    const link = this.documentService.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.documentService.head.appendChild(link);
  }

  deleteCanonical() {
    if (!isPlatformBrowser(this.platformId)) return;

    const oldLink = this.documentService.querySelector('link[rel=canonical]');
    if (oldLink) oldLink.remove();
  }
}
