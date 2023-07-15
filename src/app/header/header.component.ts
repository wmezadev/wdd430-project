import { Component } from '@angular/core';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuOpen = false;
  faUpRightFromSquare = faUpRightFromSquare;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
