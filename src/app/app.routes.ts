import { Routes } from '@angular/router';

import { TutorialPageComponent } from './pages/tutorial-page/tutorial-page';
import { tutorialResolver } from './shared/tutorial-resolver';

export const routes: Routes = [
  {
    path: 'tutorials/:id',
    component: TutorialPageComponent,
    resolve: { tutorial: tutorialResolver },
  },
];
