import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {AuthMasterComponent} from '../../../shared/components/auth-master/auth-master.component';
import {filter, Observable, take, tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectUserLoading, selectUserError, selectUser, UserActions} from '../../../store';
import {Router} from '@angular/router';
import {RegisterUser} from '../../../shared/models/registeruser';
import {toSignal} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    AuthMasterComponent,
    AsyncPipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly loading = toSignal(this.store.select(selectUserLoading));
  readonly error$: Observable<string | null> = this.store.select(selectUserError);

  constructor() {
    this.store.select(selectUser).pipe(
      filter(user => !!user),
      take(1),
      tap(() => console.log('logged in successfully'))
    ).subscribe();
  }

  readonly form: FormGroup = this.fb.group(
    {
      fname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validators: this.passwordMatchValidator
    }
  );

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { fname, lname, email, password } = this.form.value;

    this.store.dispatch(UserActions.registerUser({
      user: { fname, lname, email, password }
    }));
  }
}
