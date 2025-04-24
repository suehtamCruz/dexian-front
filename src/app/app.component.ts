import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { AuthPipe } from './shared/pipes/auth.pipe';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MenuComponent, AuthPipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  localStorage = localStorage;
}
