import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  formUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  // -----------------------------------
  // INICIALIZAMOS FORMULARIO
  // -----------------------------------
  initForm(): void {
    this.formUser = this.fb.group({
      nameUser: ['', Validators.required],
      password: ['', Validators.required]
    });
  };

  // -----------------------------------
  // LOGUEAMOS USUARIO
  // -----------------------------------
  loginUser() {
    let nameUser: string = this.formUser.get('nameUser').value;
    this.formUser.get('nameUser').setValue(nameUser.toLowerCase());

    this.authService.authentication(this.formUser).subscribe(
      responseTutenUser => {
        if (responseTutenUser.sessionTokenBck) {
          // GUARDAMOS TOKEN OBTENIDO
          localStorage.setItem("token", responseTutenUser.sessionTokenBck);
        } else {
          this.swalError("Token vacio");
        }
        this.router.navigate(['data', nameUser]);
      }, error => {
        this.swalError("Datos erroneos!");
        this.resetFormUser();
      }
    )
  };

  // ------------------------------------------------------
  // UTILIZAMOS LIBRERIA SwalFire PARA MOSTRAR MSJ DE ERROR
  // ------------------------------------------------------
  swalError(msjError: string): void {
    Swal.fire({
      position: 'center-start',
      icon: 'error',
      title: `${msjError}`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  // ------------------------------------------------------
  // RESETEAMOS FORMULARIO
  // ------------------------------------------------------
  resetFormUser(): void {
    this.formUser.reset();

  }
}
