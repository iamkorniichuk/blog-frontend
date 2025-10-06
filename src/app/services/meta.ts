import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  private definitiveProperties = ['name', 'rel'];

  setTag(meta: MetaDefinition) {
    let definitiveProperty: string | null = null;
    for (const property in meta) {
      if (this.definitiveProperties.includes(property)) {
        definitiveProperty = property;
        break;
      }
    }
    if (!definitiveProperty)
      throw Error(`Meta lacks definitive property (${this.definitiveProperties.join(', ')})`);
    const selector = `${definitiveProperty}="${meta[definitiveProperty]}"`;
    const tags = this.metaService.getTags(selector);
    for (const obj of tags) obj.remove();

    this.metaService.addTag(meta);
  }

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
