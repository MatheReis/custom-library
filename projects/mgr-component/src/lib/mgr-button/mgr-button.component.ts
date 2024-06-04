import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mgr-button',
  templateUrl: './mgr-button.component.html',
  styleUrls: ['./mgr-button.component.css'],
})
export class MgrButtonComponent implements OnInit {
  @Input() text: string = 'Clique aqui';
  @Input() bgColor:
    | 'primary'
    | 'primary-light'
    | 'secondary'
    | 'secondary-light' = 'primary';
  @Input() textColor: string = '#ffffff';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  colorMap: { [key: string]: string } = {
    primary: '#0080ff',
    'primary-light': '#53b7e8',
    secondary: '#f58220',
    'secondary-light': '#faa73f',
  };

  sizeMap: { [key: string]: string } = {
    sm: '100px',
    md: '150px',
    lg: '200px',
  };

  backgroundColor: string = this.colorMap['primary'];
  width: string = this.sizeMap['md'];

  ngOnInit() {
    this.backgroundColor =
      this.colorMap[this.bgColor] || this.colorMap['primary'];
    this.width = this.sizeMap[this.size] || this.sizeMap['md'];
  }
}
