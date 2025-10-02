import { Injectable } from '@angular/core';

import tutorialsData from '../../assets/tutorials.json';

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  solution: string;
  tags: string[];
  createdAt: Date;
}

type CreateTutorialDto = Omit<Tutorial, 'id' | 'createdAt'>;
type ReadTutorialDto = Omit<Tutorial, 'createdAt'> & { createdAt: string };
type UpdateTutorialDto = Partial<CreateTutorialDto>;

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

  async readAll(start = 0, end = 20): Promise<Tutorial[]> {
    const values = Object.values(this.tutorials);
    const tutorials: Tutorial[] = values.slice(start, end);
    return tutorials;
  }

  async readAllIds(): Promise<Tutorial['id'][]> {
    return Object.keys(this.tutorials);
  }

  async update(id: Tutorial['id'], tutorial: UpdateTutorialDto): Promise<Tutorial> {
    const oldTutorial = this.tutorials[id];

    const updatedTutorial: Tutorial = { ...oldTutorial, ...tutorial };

    this.tutorials[id] = updatedTutorial;
    return updatedTutorial;
  }

  async delete(id: Tutorial['id']): Promise<void> {
    delete this.tutorials[id];
  }
}
