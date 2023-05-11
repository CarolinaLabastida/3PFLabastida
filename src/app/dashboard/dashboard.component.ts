import { Component } from '@angular/core';
import items from './nav-items';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 navItems;

 constructor(private authService: AuthService){
  const role = localStorage.getItem('role');
  if(role){
    this.navItems = items.filter(i => i.roles.includes(role))
  }
 }

 logout(): void{
  this.authService.logout();
}
}
