import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/authentication/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router=inject(Router)
  private readonly fb=inject(FormBuilder)

  errorMassege: WritableSignal<string> = signal<string>("");
  successMassege: WritableSignal<string> = signal<string>("");
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  flag: WritableSignal<boolean> = signal<boolean>(true);

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerFormInit();
  }
  registerFormInit():void{
    this.registerForm=this.fb.group(
      {
        name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]),
        rePassword: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)
        ])
      },
      { validators: this.checkPassword }
    );
  }


  checkPassword = (group: AbstractControl) => {
    return group.get('password')?.value === group.get('rePassword')?.value
      ? null
      : { passwordMismatch: true };
  };

  submitRegisterForm(): void {
    this.isLoading.set(true);

    if (this.registerForm.valid) {
      this.authService.sendRegisterData(this.registerForm.value).subscribe({
        next: (res) =>{
          console.log(res)
          this.successMassege.set(res.message) 
          this.isLoading.set(false) 
          this.registerForm.reset()
          setTimeout(() => {
            this.router.navigate(["/login"])
          }, 1000);
        },
        error: (err) => {
          console.log(err)
          this.errorMassege.set(err.error.message)
          this.isLoading.set(false)         
        },
      });
    }
    else{
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please fill in all the fields",
      });
    }
  }


  toggleFlag(): void {
    this.flag.set(!this.flag());
  }

}
