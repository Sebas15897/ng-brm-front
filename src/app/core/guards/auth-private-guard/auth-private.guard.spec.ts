import { TestBed } from '@angular/core/testing';
import { AuthPrivateGuard } from './auth-private.guard';

describe('AuthPrivateGuardGuard', () => {
  let guard: AuthPrivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPrivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
