import { Component, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() user;

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  logout() {
    this.afAuth.auth.signOut();
  }

}
