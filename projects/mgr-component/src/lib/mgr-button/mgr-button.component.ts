import { Component, Input } from '@angular/core';

@Component({
  selector: 'mgr-button',
  templateUrl: './mgr-button.component.html',
  styleUrls: ['./mgr-button.component.css'],
})
export class MgrButtonComponent {
  @Input() text: string = 'Clique aqui';
  @Input() bgColor: string = '#d9534f';
  @Input() textColor: string = '#ffffff';
}
