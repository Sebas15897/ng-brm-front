import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { SweetAlertHelper } from 'src/app/core/helpers/sweet-alert.helper';
import { BrmLogoutAction } from '../../../../core/state/auth/auth.actions';
import { ShowSideBarAction } from '../../../../core/state/layout/layout.actions';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  private destroy: Subject<boolean> = new Subject();
  viewSidebar = true;

  constructor(
    private store: Store,
    private sweetAlertHelper: SweetAlertHelper,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.addMaterialIcon('bars-solid', '../../../../../assets/svg/bars-solid.svg');
    this.addMaterialIcon('right-from-bracket-solid', '../../../../../assets/svg/right-from-bracket-solid.svg');
    this.addMaterialIcon('user-solid', '../../../../../assets/svg/user-solid.svg');
    this.addMaterialIcon('gear-solid', '../../../../../assets/svg/gear-solid.svg');
    this.addMaterialIcon('circle-xmark-solid', '../../../../../assets/svg/circle-xmark-solid.svg');
  }

  showMenu() {
    const show = (this.viewSidebar = !this.viewSidebar);
    this.store.dispatch(new ShowSideBarAction(show));
  }


  addMaterialIcon(name: string, url: string) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }


  logout() {
    this.sweetAlertHelper
      .createCustomAlert({
        title: 'Finalizar Sesión',
        text: '¿Esta seguro que desea finalizar su sesión?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Finalizar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.value) {
          this.store
            .dispatch(new BrmLogoutAction())
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
              this.router.navigateByUrl('/login');
            });
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
