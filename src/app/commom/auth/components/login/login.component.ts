import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule
    
  
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  authLogin !: Login
  
constructor(
  private authService: AuthenticationService,
  private router: Router,
  private formBuilder: FormBuilder,
  private _snackBar: MatSnackBar
){}
  ngOnInit(): void {
    this.criarFormulario()
  }

Login(){
  this.authLogin = Object.assign('', this.authLogin, this.loginForm.value);
  this.authLogin.email = this.authLogin.email.toLowerCase();

  this.authService.login({email:this.authLogin.email, password: this.authLogin.password})
  .subscribe((user) => {
    if(user?.id){
      this.router.navigateByUrl('dashboard');
    }
  }
  
)
  
}

criarFormulario(){
  this.loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],

  });
}

}
