import { Injectable } from '@angular/core';
import { Request } from 'express';

import { TutorialApiService } from './tutorial-api';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SitemapService {
  private tutorialApi = new TutorialApiService();
  private origin!: string;

  async generateXml(request: Request): Promise<string> {
    const protocol = 'https';
    const host = request.headers.host;
    this.origin = `${protocol}://${host}/`;

    const urls = await this.getUrls();
    return `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
          .map(
            (u) => `
            <url>
              <loc>${u.loc}</loc>
              ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
              ${u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : ''}
              ${u.priority ? `<priority>${u.priority}</priority>` : ''}
            </url>`,
          )
          .join('')}
      </urlset>
    `.trim();
  }

  async getUrls(): Promise<SitemapUrl[]> {
    const urls: SitemapUrl[] = [
      { loc: this.absolute(''), changefreq: 'weekly', priority: 1 },
      { loc: this.absolute('about-us'), changefreq: 'yearly', priority: 0.9 },
      { loc: this.absolute('tools'), changefreq: 'monthly', priority: 0.8 },
      { loc: this.absolute('tools/image-upscale'), changefreq: 'yearly', priority: 0.7 },
      { loc: this.absolute('tutorials'), changefreq: 'weekly', priority: 0.8 },
    ];

    const ids = await this.tutorialApi.readAllIds();
    for (const slug of ids) {
      urls.push({ loc: this.absolute(`tutorials/${slug}`), changefreq: 'monthly', priority: 0.7 });
    }

    return urls;
  }

  private absolute(path: string): string {
    return this.origin + path;
  }
}
