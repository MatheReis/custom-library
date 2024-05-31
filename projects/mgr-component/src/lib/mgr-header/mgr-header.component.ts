import { Component, Input } from '@angular/core';

@Component({
  selector: 'mgr-header',
  templateUrl: './mgr-header.component.html',
  styleUrls: ['./mgr-header.component.css'],
})
export class MgrHeaderComponent {
  @Input() icon: string | null = null;
  @Input() bgColor: string = '#333';
  @Input() navItems: { label: string; href: string }[] = [];
}
