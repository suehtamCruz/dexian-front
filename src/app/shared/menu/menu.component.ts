import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule, MatIconModule, MatTooltipModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  menuItems = [
    {
      label: 'Alunos',
      path: 'students',
    },
    {
      label: 'Escolas',
      path: 'schools',
    },
  ];
  constructor(private router: Router) {}
  navigateByPath(path: string) {
    this.router.navigate([path]);
  }

  logOut() {
    this.router.navigate(['login']);
  }
}
