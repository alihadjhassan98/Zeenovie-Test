import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService ,private router :Router) { }

  ngOnInit(

  ): void {
  
  }


  onLogout() {
    this.authService.logout();
  }
}
