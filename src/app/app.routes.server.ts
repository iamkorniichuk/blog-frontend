import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

import { TutorialApiService } from './services/tutorial-api';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'tutorials',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'tutorials/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    async getPrerenderParams() {
      const tutorialApi = inject(TutorialApiService);
      const ids = await tutorialApi.readAllIds();
      return ids.map((id) => ({ id }));
    },
  },
];
