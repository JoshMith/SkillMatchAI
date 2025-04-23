import EmailService from './emailService';

(async () => {
    await EmailService.sendEmail(
        'joshuamithamo6@gmail.com',
        'Test Email ✔',
        'This is a test email sent using Ethereal + Nodemailer.',
        '<b>This is a test email sent using Ethereal + Nodemailer.</b>'
    );
})();
