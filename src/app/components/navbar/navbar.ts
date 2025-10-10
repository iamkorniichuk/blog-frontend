import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class NavbarComponent {}
