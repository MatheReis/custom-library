import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MgrComponentModule } from 'mgr-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MgrComponentModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
