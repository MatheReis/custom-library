import { Component } from '@angular/core';

@Component({
  selector: 'mgr-header',
  templateUrl: './mgr-header.component.html',
  styleUrls: ['./mgr-header.component.css'],
})
export class MgrHeaderComponent {
  logo: string = 'CompanyLogo';
  navItems: { label: string; href: string; active?: boolean }[] = [
    { label: 'Home', href: '#home', active: true },
    { label: 'Contact', href: '#contact' },
    { label: 'About', href: '#about' }
  ];
}
