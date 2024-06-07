import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: any;
  form!: FormGroup;
  showPassword: boolean = false;
  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
  }
  initForm() {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false),
    });
  }

  login() {
    this.authService.signIn(this.form.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.router.navigateByUrl(this.returnUrl);
          this.toastService.success('Đăng nhập thành công !');
        } else {
          this.toastService.error(res.errors);
        }
      },
      (err: any) => {}
    );
  }
  logout() {
    this.authService.signOut();
    this.router.navigateByUrl('/auth/login');
  }
}
