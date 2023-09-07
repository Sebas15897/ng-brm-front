import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.addMaterialIcon('circle-xmark-solid', '../../../../../assets/svg/circle-xmark-solid.svg');
    this.addMaterialIcon('cake-candles-solid', '../../../../../assets/svg/cake-candles-solid.svg');
    this.addMaterialIcon('phone-solid', '../../../../../assets/svg/phone-solid.svg');
    this.addMaterialIcon('envelope-solid', '../../../../../assets/svg/envelope-solid.svg');
  }

  addMaterialIcon(name: string, url: string) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }

}
