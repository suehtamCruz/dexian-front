import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-menu',
    imports: [CommonModule, RouterModule],
    templateUrl: './menu.component.html',
})
export class MenuComponent {


    constructor(private router: Router) { }
}