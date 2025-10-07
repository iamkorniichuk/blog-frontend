import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LogoIconComponent } from '../icons/logo-icon';

@Component({
  selector: 'app-navbar',
  imports: [LogoIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class NavbarComponent {}
