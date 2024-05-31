import { Component, Input } from '@angular/core';

@Component({
  selector: 'mgr-form',
  templateUrl: './mgr-form.component.html',
  styleUrls: ['./mgr-form.component.css'],
})
export class MgrFormComponent {
  @Input() placeholder: string = 'Digite aqui...';
  @Input() borderColor: string = '#ccc';
}
