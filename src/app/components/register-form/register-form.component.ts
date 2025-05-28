import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.registerForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{6,10}$/)]],
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      ciudad: ['', Validators.required],
      foto: ['', Validators.required]
    });
  }
enviarWhatsApp() {
  const mensaje = `Hola, mis datos son:
  Cédula: ${this.registerForm.value.cedula}
  Teléfono: ${this.registerForm.value.telefono}
  Foto: [Imagen adjunta]`;

  window.open(`https://wa.me/573001234567?text=${encodeURIComponent(mensaje)}`, '_blank');
}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.registerForm.patchValue({ foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

async onSubmit() {
  if (this.registerForm.invalid) return;

  try {
    const result = await this.api.registerUser(this.registerForm.value);
    if (result) {
      alert('Usuario registrado correctamente.');
      this.enviarWhatsApp();
    } else {
      alert('Error al registrar usuario.');
    }
  } catch (error) {
    console.error('Error en el registro:', error);
    alert('Error al registrar usuario.');
  }
}
}
