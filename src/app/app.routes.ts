import { Routes } from '@angular/router';

import { tutorialResolver } from './shared/tutorial-resolver';
import { TutorialPageComponent } from './pages/tutorial-page/tutorial-page';
import { TutorialListPageComponent } from './pages/tutorial-list-page/tutorial-list-page';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page';
import { ToolsListPageComponent } from './pages/tools-list-page/tools-list-page';
import { ImageUpscalePageComponent } from './pages/image-upscale-page/image-upscale-page';

export const routes: Routes = [
  {
    path: 'about-us',
    component: AboutUsPageComponent,
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: 'tools',
    component: ToolsListPageComponent,
  },
  {
    path: 'tools/image-upscale',
    component: ImageUpscalePageComponent,
  },
  {
    path: 'tutorials',
    component: TutorialListPageComponent,
  },
  {
    path: 'tutorials/:id',
    component: TutorialPageComponent,
    resolve: { tutorial: tutorialResolver },
  },
];
