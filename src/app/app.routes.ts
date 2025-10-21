import { Route } from '@angular/router';

import { tutorialResolver } from './shared/tutorial-resolver';
import { StaticRouteMeta } from './services/meta';

import { HomePageComponent } from './pages/home-page/home-page';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page';
import { ContactPageComponent } from './pages/contact-page/contact-page';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page';
import { CookiesPolicyPageComponent } from './pages/cookies-policy-page/cookies-policy-page';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page';
import { ToolsListPageComponent } from './pages/tools-list-page/tools-list-page';
import { ImageUpscalePageComponent } from './pages/image-upscale-page/image-upscale-page';
import { TutorialPageComponent } from './pages/tutorial-page/tutorial-page';
import { TutorialListPageComponent } from './pages/tutorial-list-page/tutorial-list-page';

export const routes: (Route & { data: StaticRouteMeta })[] = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      title: 'Solo Developer Blog | ReturnsNull;',
      description:
        'Explore tutorials on a web development and all related topics in structured, right-to-solution articles.',
      imageUrl: 'https://www.returnsnull.dev/images/home-page-image.png',
      imageAlt: 'White text "null;" on black background',
      type: 'website',
      createdAt: new Date(2025, 9, 4),
      tags: [
        'web development',
        'software development',
        'tutorials',
        'blog',
        'coding',
        'programming',
      ],
      canonicalUrl: 'https://www.returnsnull.dev',
    },
  },
  {
    path: 'about',
    component: AboutUsPageComponent,
    data: {
      title: 'About | ReturnsNull;',
      description: 'Learn about the development team of returnsnull.dev.',
      imageUrl: 'https://www.returnsnull.dev/images/home-page-image.png',
      imageAlt: 'White text "null;" on black background',
      type: 'article',
      createdAt: new Date(2025, 9, 10),
      tags: ['developer blog', 'software engineering', 'returnsnull', 'team', 'about'],
    },
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    data: {
      title: 'Contact | ReturnsNull;',
      description: 'Get in touch with us.',
      imageUrl: 'https://www.returnsnull.dev/images/home-page-image.png',
      imageAlt: 'White text "null;" on black background',
      type: 'article',
      createdAt: new Date(2025, 9, 10),
      tags: ['contact', 'developer', 'info'],
    },
  },
  {
    path: 'privacy',
    component: PrivacyPolicyPageComponent,
    data: {
      title: 'Privacy | ReturnsNull;',
      description: 'Read the privacy policy.',
      imageUrl: 'https://www.returnsnull.dev/images/home-page-image.png',
      imageAlt: 'White text "null;" on black background',
      type: 'article',
      createdAt: new Date(2025, 9, 10),
      modifiedAt: new Date(2025, 9, 16),
      tags: ['privacy policy', 'analytics', 'GDPR', 'data protection'],
    },
  },
  {
    path: 'cookies',
    component: CookiesPolicyPageComponent,
    data: {
      title: 'Cookies | ReturnsNull;',
      description: 'Learn how we use cookies.',
      imageUrl: 'https://www.returnsnull.dev/images/home-page-image.png',
      imageAlt: 'White text "null;" on black background',
      type: 'article',
      createdAt: new Date(2025, 9, 10),
      modifiedAt: new Date(2025, 9, 16),
      tags: ['cookies', 'analytics', 'user data'],
    },
  },
  {
    path: '404',
    component: NotFoundPageComponent,
    data: {
      title: 'Not Found | ReturnsNull;',
      description: "Page not found - the URL you're looking for doesn't exist.",
      imageUrl: 'https://www.returnsnull.dev/images/home-page-image.png',
      imageAlt: 'White text "null;" on black background',
      type: 'website',
      createdAt: new Date(2025, 9, 4),
      tags: ['404', 'error page', 'not found'],
    },
  },
  {
    path: 'tools',
    component: ToolsListPageComponent,
    data: {
      title: 'Tools | ReturnsNull;',
      description: 'Discover handy in-browser free tools without any limits and intrusive ads.',
      imageUrl: 'https://www.returnsnull.dev/images/image-upscale-cover.png',
      imageAlt:
        'An image of a lake, forest, mountains and blue sky splitted out in half into low quality (before) and high quality (after) parts',
      type: 'website',
      createdAt: new Date(2025, 9, 4),
      modifiedAt: new Date(2025, 9, 16),
      tags: ['tools', 'free', 'no sign up', 'in-browser', 'no limits'],
    },
  },
  {
    path: 'tools/image-upscale',
    component: ImageUpscalePageComponent,
    data: {
      title: 'AI Image Upscale In-Browser Free | ReturnsNull;',
      description: 'Upscale your images for free without sign up, right in your browser.',
      imageUrl: 'https://www.returnsnull.dev/images/image-upscale-cover.png',
      imageAlt:
        'An image of a lake, forest, mountains and blue sky splitted out in half into low quality (before) and high quality (after) parts',
      type: 'website',
      createdAt: new Date(2025, 9, 4),
      tags: ['upscale image', 'no sign up', 'free', 'no intrusive ads', 'bigger resolution'],
    },
  },
  {
    path: 'tutorials',
    component: TutorialListPageComponent,
    data: {
      title: 'Tutorials | ReturnsNull;',
      description:
        "Step-by-step coding tutorials, and solutions that help you develop faster and avoid diving deep into topics when you don't want to.",
      type: 'website',
      createdAt: new Date(2025, 9, 4),
      tags: ['tutorials', 'web development', 'learn', 'solution'],
    },
  },
  {
    path: 'tutorials/:id',
    component: TutorialPageComponent,
    resolve: { tutorial: tutorialResolver },
    data: { type: 'article' },
  },
];
