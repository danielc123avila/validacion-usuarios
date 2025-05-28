import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { register } from 'module';
@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RegisterFormComponent],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  cedulaForm: FormGroup;
  userFound: boolean | null = null;
  userData: any = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.cedulaForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{6,10}$/)]]
    });
  }


async onSubmit() {
  if (this.cedulaForm.invalid) return;

  try {
    const cedula = this.cedulaForm.value.cedula;
    this.userData = await this.api.getUserByCedula(cedula);

    this.userFound = this.userData ? true : false;
  } catch (error) {
    console.error('Error en la validación:', error);
    this.userFound = false;
  }
}
  }

