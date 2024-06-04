import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mgr-form',
  templateUrl: './mgr-form.component.html',
  styleUrls: ['./mgr-form.component.css'],
})
export class MgrFormComponent implements OnInit {
  @Input() placeholder: string = 'Digite aqui...';
  @Input() borderColor: string = '#ccc';
  @Input() title: string = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  sizeMap: { [key: string]: string } = {
    'sm': '100px',
    'md': '200px',
    'lg': '300px'
  };

  width: string = this.sizeMap['md'];

  ngOnInit() {
    this.width = this.sizeMap[this.size] || this.sizeMap['md'];
  }
}
