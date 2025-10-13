import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

export type DefinitiveKey = 'name' | 'rel';
export type DefinitiveMeta = Partial<Record<DefinitiveKey, string>>;

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  private definitiveKeys: DefinitiveKey[] = ['name', 'rel'];

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
    this.metaService.removeTag(selector);
  }

  private findDefinitiveKey(meta: DefinitiveMeta): DefinitiveKey | undefined {
    return this.definitiveKeys.find((k) => k in meta && !!meta[k]);
  }

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
