import { Component } from '@angular/core';
import { IChildMenu, IMenu } from 'src/app/core/interfaces/menu.interface';
import { Menu } from '../../../../core/models/menu.data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent {
  sideMenu: IMenu[] = Menu;
  selectChild = `private/${this.activatedRoute.snapshot?.children[0]?.routeConfig?.path}`;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  navigateTo(menu: IChildMenu) {
    this.selectChild = menu.path;
    this.router.navigate([menu.path]);
  }

  getSelected(menu: IChildMenu): boolean {
    return menu.path === this.selectChild;
  }
}
