import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = new FormGroup<any>({});

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastController: ToastController,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  login() {
    const login: LoginDto = {
      user: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }
    this.authService.auth(login).subscribe(res => {
      if (res && res.length > 0) {
        const user = res[0];
        console.log('Usuario existente: ', res);
        switch (user.estado) {
          case 'A':
            this.authService.setSession(user);
            this.loginForm.reset();
            this.router.navigate(['home']);
            console.log('Usuario:', this.authService.getSession());
            break;
          case 'I':
            this.showMessage('Tu usuario se encuentra inactivo');
            break;
          default:
            this.showMessage('El estado de tu cuenta es desconocido, comunicate con el administrador');
            break;
        }
      } else {
        console.log('No tienes acceso');
        this.showMessage('El usuario y/o contraseña es incorrecto');
      }
    })
  }

  async showMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

}
