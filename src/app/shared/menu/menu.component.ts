import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
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
  ]
  constructor(private router: Router) {}
  navigateByPath(path: string) {
    this.router.navigate([path]);
  }
}
