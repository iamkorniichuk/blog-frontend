import { Injectable } from '@angular/core';

import tutorialsData from '../../assets/tutorials.json';
import { ResponsiveImage } from '../components/elements/image/image';

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  image: ResponsiveImage;
  content: string;
  solution: string;
  tags: string[];
  createdAt: Date;
  modifiedAt: Date | undefined;
}
type CreateTutorialDto = Omit<Tutorial, 'id' | 'createdAt' | 'modifiedAt'>;
type ReadTutorialDto = Omit<Tutorial, 'createdAt' | 'modifiedAt'> & {
  createdAt: string;
  modifiedAt: string | null;
};
type UpdateTutorialDto = Partial<CreateTutorialDto>;

export interface PageFilter {
  start: number;
  end: number;
}

@Injectable({
  providedIn: 'root',
})
export class TutorialApiService {
  private tutorials: Record<Tutorial['id'], Tutorial> = {};

  constructor() {
    const data = tutorialsData as Record<string, ReadTutorialDto>;
    for (const key in data) {
      const value = data[key];
      this.tutorials[key] = {
        ...value,
        createdAt: new Date(value.createdAt),
        modifiedAt: value.modifiedAt ? new Date(value.modifiedAt) : undefined,
      };
    }
  }

  async create(tutorial: CreateTutorialDto): Promise<Tutorial> {
    const id: Tutorial['id'] = this.slugify(tutorial['title']);
    const createdAt: Tutorial['createdAt'] = new Date();

    const createdTutorial: Tutorial = {
      id: id,
      ...tutorial,
      createdAt: createdAt,
      modifiedAt: undefined,
    };

    this.tutorials[createdTutorial['id']] = createdTutorial;
    return createdTutorial;
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async readById(id: Tutorial['id']): Promise<Tutorial> {
    return this.tutorials[id];
  }

  async readAll(page: PageFilter): Promise<Tutorial[]> {
    const values = Object.values(this.tutorials);
    const tutorials: Tutorial[] = values.slice(page.start, page.end);
    return tutorials;
  }

  async readAllIds(): Promise<Tutorial['id'][]> {
    return Object.keys(this.tutorials);
  }

  async readLength(): Promise<number> {
    return Object.keys(this.tutorials).length;
  }

  async update(id: Tutorial['id'], tutorial: UpdateTutorialDto): Promise<Tutorial> {
    const oldTutorial = this.tutorials[id];
    const modifiedAt: Tutorial['createdAt'] = new Date();

    const updatedTutorial: Tutorial = { ...oldTutorial, ...tutorial, modifiedAt };

    this.tutorials[id] = updatedTutorial;
    return updatedTutorial;
  }

  async delete(id: Tutorial['id']): Promise<void> {
    delete this.tutorials[id];
  }
}
