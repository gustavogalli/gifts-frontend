import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  modalTitle: string = '';
  modalContent: string = '';

  openModal(type: string): void {
    if (type === 'contact') {
      this.modalTitle = 'Contact me';
      this.modalContent = `
        <p class="mb-2">
          <a href="https://www.linkedin.com/in/gustavogalli/" target="_blank" rel="noopener noreferrer"
            class="text-gray-600 hover:text-gray-800 font-bold">LinkedIn</a>
        </p>
        <p class="mb-2">
          <a href="https://github.com/gustavogalli/" target="_blank" rel="noopener noreferrer"
            class="text-gray-600 hover:text-gray-800 font-bold">GitHub</a>
        </p>
        <p>
          <a href="mailto:gustavosgalli@gmail.com" class="text-gray-600 hover:text-gray-800 font-bold">gustavosgalli@gmail.com</a>
        </p>
      `;
    } else if (type === 'terms') {
      this.modalTitle = 'Terms of Use';
      this.modalContent = `
        <p>Welcome to our application. By accessing or using our services, you agree to be bound by these Terms of Use. Please read them carefully.</p><br>
        <p><strong>1. Use of Service</strong><br/>
        You may use the service only for lawful purposes and in accordance with these Terms. You agree not to use it in any way that violates any local, state, national, or international law.</p>
        <p><strong>2. Account Responsibility</strong><br/>
        You are responsible for safeguarding your account credentials and for any activity under your account.</p>
        <p><strong>3. Intellectual Property</strong><br/>
        All content, features and functionality are owned by us or our licensors and are protected by copyright, trademark, and other laws.</p>
        <p><strong>4. Termination</strong><br/>
        We may terminate or suspend your access immediately, without prior notice, for any reason.</p>
        <p><strong>5. Changes to Terms</strong><br/>
        We reserve the right to modify these Terms at any time. Continued use of the service after changes indicates acceptance.</p>
      `;
    } else if (type === 'privacy') {
      this.modalTitle = 'Privacy Policy';
      this.modalContent = `
        <p>We value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.</p><br>
        <p><strong>1. Information We Collect</strong><br/>
        We may collect information you provide directly (e.g., name, email), and usage data (e.g., pages visited).</p>
        <p><strong>2. How We Use Your Information</strong><br/>
        Your information helps us to provide, maintain, and improve our services, to communicate with you, and to personalize your experience.</p>
        <p><strong>3. Sharing of Information</strong><br/>
        We do not sell your personal data. We may share with service providers who perform services on our behalf under confidentiality agreements.</p>
        <p><strong>4. Data Security</strong><br/>
        We implement reasonable security measures to protect your information, but cannot guarantee absolute security.</p>
        <p><strong>5. Your Choices</strong><br/>
        You may access, update, or delete your personal information at any time by contacting us.</p>
      `;
    }
  }
  

  closeModal(): void {
    this.modalTitle = '';
    this.modalContent = '';
  }
}
