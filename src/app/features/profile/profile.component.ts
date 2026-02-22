import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserActions } from '../../store/user/user.actions';
import { selectUser, selectUserLoading, selectUserError } from '../../store/user/user.selectors';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SafeUser } from '../../shared/models/safeuser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private subs = new Subscription();

  user: SafeUser | null = null;
  loading$ = this.store.select(selectUserLoading);
  error$ = this.store.select(selectUserError);

  showDeleteConfirm = false;
  updateSuccess = false;

  form: FormGroup = this.fb.group({
    fname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(6)]],
  });

  ngOnInit(): void {
    this.subs.add(
      this.store.select(selectUser).subscribe(user => {
        this.user = user;
        if (user) {
          this.form.patchValue({
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            password: ''
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onUpdateProfile(): void {
    if (this.form.invalid || !this.user) {
      this.form.markAllAsTouched();
      return;
    }

    const changes: any = {};
    if (this.form.value.fname !== this.user.fname) changes.fname = this.form.value.fname;
    if (this.form.value.lname !== this.user.lname) changes.lname = this.form.value.lname;
    if (this.form.value.email !== this.user.email) changes.email = this.form.value.email;
    if (this.form.value.password) changes.password = this.form.value.password;

    if (Object.keys(changes).length === 0) return;

    this.updateSuccess = false;
    this.store.dispatch(UserActions.updateUser({ id: this.user.id, changes }));

    // Show success after a brief delay (optimistic)
    this.subs.add(
      this.store.select(selectUserLoading).subscribe(loading => {
        if (!loading && !this.updateSuccess) {
          // Check if there's no error
          this.subs.add(
            this.store.select(selectUserError).subscribe(err => {
              if (!err) {
                this.updateSuccess = true;
                this.form.get('password')?.reset('');
                setTimeout(() => this.updateSuccess = false, 3000);
              }
            })
          );
        }
      })
    );
  }

  onDeleteAccount(): void {
    if (!this.user) return;
    this.store.dispatch(UserActions.deleteUser({ id: this.user.id }));
  }

  onLogout(): void {
    this.store.dispatch(UserActions.logoutUser());
  }
}
