import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Adicione a lógica de autenticação aqui
    console.log('Usuário:', this.username);
    console.log('Senha:', this.password);
  }
}
