import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Tutorial, TutorialApiService } from '../services/tutorial-api';

export const tutorialResolver: ResolveFn<Tutorial> = async (route) => {
  const api = inject(TutorialApiService);

  const id = route.paramMap.get('id');
  if (id === null) throw new Error('Tutorial ID parameter is missing from the route');

  const tutorial = await api.readById(id);
  return tutorial;
};
