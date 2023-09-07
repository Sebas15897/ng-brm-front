import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  hide: boolean = true;
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.formLogin = this.createForm();
    this.addMaterialIcon('eye-solid', '../../../../assets/svg/eye-solid.svg');
    this.addMaterialIcon('eye-slash-solid', '../../../../assets/svg/eye-slash-solid.svg');
    this.addMaterialIcon('user-solid', '../../../../assets/svg/user-solid.svg');
  }

  ngOnInit() {}

  createForm(): FormGroup {
    return this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      reminded: [false],
    });
  }

  login() {}

  addMaterialIcon(name: string, url: string) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }

  get showIcon(): string {
    return this.hide ? 'eye-solid' : 'eye-slash-solid';
  }

  get invalidForm(): boolean {
    return this.formLogin.invalid;
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
