import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatDivider} from '@angular/material/divider';
import {
  MatAnchor,
  MatButton,
  MatFabAnchor,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton
} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mortgage-payment-angular-app';
}
