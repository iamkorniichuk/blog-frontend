import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { Tool, ToolApiService } from '../services/tool-api';

export function toolResolverFactory(id: Tool['id']): ResolveFn<Tool> {
  return async () => {
    const api = inject(ToolApiService);
    const tool = await api.readById(id);
    return tool;
  };
}
