import { Component, Input } from '@angular/core';
import { MatIconModule} from '@angular/material/icon'
import { MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../auth/service/authentication.service';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
    @Input() menu !: any []
    isLogado: boolean = false

    constructor(private authService: AuthenticationService,
      private router: Router
    ){}

  ngOnInit(): void {
    this.authService.usuarioEstaLogado()
    .subscribe(estaLogado => {
      console.log('estaLogado: ' + estaLogado)
      this.isLogado = estaLogado;
    })
  }

  Logout(){
    this.authService.Sair();
    this.router.navigate(['authentication', 'login']);

  }


}
