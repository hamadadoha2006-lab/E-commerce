import { Component, inject, signal, WritableSignal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { stored_key } from '../../core/constant/storedKey';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly platformId = inject(PLATFORM_ID);

  errorMassege: WritableSignal<string> = signal<string>('');
  successMassege: WritableSignal<string> = signal<string>('');
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  refSubscription: Subscription = new Subscription();
  showForgotPassword: WritableSignal<boolean> = signal<boolean>(false);
  forgotPasswordStep: WritableSignal<number> = signal<number>(1); // 1: email, 2: code, 3: new password

  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  verifyCodeForm!: FormGroup;
  resetPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.loginFormInit();
    this.forgotPasswordFormInit();
    this.verifyCodeFormInit();
    this.resetPasswordFormInit();
  }
  
  loginFormInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
    });
  }

  forgotPasswordFormInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  verifyCodeFormInit(): void {
    this.verifyCodeForm = this.fb.group({
      resetCode: new FormControl(null, [Validators.required]),
    });
  }

  resetPasswordFormInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
    });
  }
  submitLoginForm(): void {
    this.isLoading.set(true);

    if (this.loginForm.valid) {
      this.refSubscription.unsubscribe();
      this.refSubscription = this.authService.sendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.successMassege.set(res.message);
          this.isLoading.set(false);
          this.loginForm.reset();
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(stored_key.userToken, res.token);
          }
          this.authService.decodeUserDataToken();
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        },
        error: (err) => {
          console.log(err);
          this.errorMassege.set(err.error.message);
          this.isLoading.set(false);
        },
      });
    }
  }

  toggleForgotPassword(): void {
    this.showForgotPassword.set(!this.showForgotPassword());
    this.errorMassege.set('');
    this.successMassege.set('');
    this.forgotPasswordStep.set(1);
  }

  submitForgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading.set(true);
      console.log('Sending forgot password request with:', this.forgotPasswordForm.value);
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          console.log('Forgot password success:', res);
          this.successMassege.set(res.message);
          this.errorMassege.set('');
          this.isLoading.set(false);
          this.forgotPasswordStep.set(2);
        },
        error: (err) => {
          console.log('Forgot password error:', err);
          this.errorMassege.set(err.error?.message || 'There was an error sending the email. Try again later!');
          this.successMassege.set('');
          this.isLoading.set(false);
        },
      });
    }
  }

  submitVerifyCode(): void {
    if (this.verifyCodeForm.valid) {
      this.isLoading.set(true);
      this.authService.verifyResetCode(this.verifyCodeForm.value).subscribe({
        next: (res) => {
          this.successMassege.set('Code verified successfully');
          this.errorMassege.set('');
          this.isLoading.set(false);
          this.forgotPasswordStep.set(3);
          this.resetPasswordForm.patchValue({
            email: this.forgotPasswordForm.value.email
          });
        },
        error: (err) => {
          this.errorMassege.set(err.error.message);
          this.successMassege.set('');
          this.isLoading.set(false);
        },
      });
    }
  }

  submitResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.isLoading.set(true);
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          this.successMassege.set('Password reset successfully');
          this.errorMassege.set('');
          this.isLoading.set(false);
          setTimeout(() => {
            this.showForgotPassword.set(false);
            this.forgotPasswordStep.set(1);
          }, 2000);
        },
        error: (err) => {
          this.errorMassege.set(err.error.message);
          this.successMassege.set('');
          this.isLoading.set(false);
        },
      });
    }
  }
}
