import { Injectable } from '@angular/core';

import toolsData from '../../assets/tools.json';
import { ResponsiveImage } from '../components/elements/image/image';

export interface Tool {
  id: string;
  name: string;
  title: string;
  image: ResponsiveImage;
  url: string;
  description: string;
  content: string;
  createdAt: Date;
}
type ReadToolDto = Omit<Tool, 'createdAt'> & { createdAt: string };

@Injectable({
  providedIn: 'root',
})
export class ToolApiService {
  private tools: Record<Tool['id'], Tool> = {};

  constructor() {
    const data = toolsData as Record<string, ReadToolDto>;
    for (const key in data) {
      const value = data[key];
      this.tools[key] = {
        ...value,
        createdAt: new Date(value.createdAt),
      };
    }
  }

  async readById(id: Tool['id']): Promise<Tool> {
    return this.tools[id];
  }

  async readAll(): Promise<Tool[]> {
    return Object.values(this.tools);
  }

  async readLength(): Promise<number> {
    return Object.keys(this.tools).length;
  }
}
