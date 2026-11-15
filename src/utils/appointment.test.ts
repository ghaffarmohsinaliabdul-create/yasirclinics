import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateAppointmentForm,
  formatAppointmentMessage,
  generateWhatsAppAppointmentUrl,
  generateQuickWhatsAppUrl,
  AppointmentFormData
} from './appointment';
import { CLINIC_INFO } from '../data/clinicData';

test('valid appointment data passes validation', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];

  const validData: AppointmentFormData = {
    patientName: 'Amina Fatima',
    phoneNumber: '+92 313 2010126',
    patientAge: '28',
    appointmentDate: dateStr,
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    doctor: 'Obstetrics & Maternal Healthcare',
    reason: 'Routine prenatal follow-up consultation'
  };

  const result = validateAppointmentForm(validData);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('empty fields fail validation with descriptive errors', () => {
  const emptyData: AppointmentFormData = {
    patientName: '',
    phoneNumber: '',
    patientAge: '',
    appointmentDate: '',
    preferredTime: '',
    doctor: '',
    reason: ''
  };

  const result = validateAppointmentForm(emptyData);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.patientName);
  assert.ok(result.errors.phoneNumber);
  assert.ok(result.errors.patientAge);
  assert.ok(result.errors.appointmentDate);
  assert.ok(result.errors.preferredTime);
  assert.ok(result.errors.reason);
});

test('invalid phone number and past date fail validation', () => {
  const invalidData: AppointmentFormData = {
    patientName: 'Amina',
    phoneNumber: '123', // too short
    patientAge: '25',
    appointmentDate: '2020-01-01', // in the past
    preferredTime: 'Evening',
    doctor: 'General',
    reason: 'Checkup'
  };

  const result = validateAppointmentForm(invalidData);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.phoneNumber);
  assert.ok(result.errors.appointmentDate);
});

test('formatAppointmentMessage formats text cleanly with clinic details', () => {
  const data: AppointmentFormData = {
    patientName: 'Sarah Ahmed',
    phoneNumber: '03132010126',
    patientAge: '32',
    appointmentDate: '2026-11-10',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    doctor: 'Pediatric Care',
    reason: 'Child immunization guidance'
  };

  const message = formatAppointmentMessage(data);
  assert.ok(message.includes('APPOINTMENT REQUEST'));
  assert.ok(message.includes(CLINIC_INFO.name));
  assert.ok(message.includes('Sarah Ahmed'));
  assert.ok(message.includes('03132010126'));
  assert.ok(message.includes('32'));
  assert.ok(message.includes('2026-11-10'));
  assert.ok(message.includes('Child immunization guidance'));
});

test('generateWhatsAppAppointmentUrl creates correct wa.me link', () => {
  const data: AppointmentFormData = {
    patientName: 'Mariam',
    phoneNumber: '03132010126',
    patientAge: '24',
    appointmentDate: '2026-11-15',
    preferredTime: 'Afternoon',
    doctor: 'Maternal Care',
    reason: 'Consultation'
  };

  const url = generateWhatsAppAppointmentUrl(data);
  assert.ok(url.startsWith(`https://wa.me/${CLINIC_INFO.phoneRaw}?text=`));
  assert.ok(url.includes(encodeURIComponent('Mariam')));
  assert.ok(url.includes(encodeURIComponent('Consultation')));
});

test('generateQuickWhatsAppUrl creates default chat link with official message', () => {
  const url = generateQuickWhatsAppUrl();
  assert.equal(
    url,
    `https://wa.me/${CLINIC_INFO.phoneRaw}?text=` +
      encodeURIComponent('Hello, I would like to get information about the clinic and book an appointment.')
  );
});

test('formatAppointmentEmailSubject and formatAppointmentEmailBody include patient details and clinic email', async () => {
  const { formatAppointmentEmailSubject, formatAppointmentEmailBody, generateMailtoAppointmentUrl } = await import('./appointment');
  const data: AppointmentFormData = {
    patientName: 'Khadija Bibi',
    phoneNumber: '03293179587',
    patientEmail: 'khadija@example.com',
    patientAge: '30',
    appointmentDate: '2026-11-20',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    doctor: 'Maternal Health & Antenatal Checkup',
    reason: 'Monthly antenatal checkup'
  };

  const subject = formatAppointmentEmailSubject(data);
  assert.ok(subject.includes('Khadija Bibi'));
  assert.ok(subject.includes('2026-11-20'));
  assert.ok(subject.includes(CLINIC_INFO.name));

  const body = formatAppointmentEmailBody(data);
  assert.ok(body.includes('Khadija Bibi'));
  assert.ok(body.includes('03293179587'));
  assert.ok(body.includes('khadija@example.com'));
  assert.ok(body.includes('tiktokpakistanmedia344@gmail.com'));
  assert.ok(body.includes('Monthly antenatal checkup'));

  const mailtoUrl = generateMailtoAppointmentUrl(data);
  assert.ok(mailtoUrl.startsWith('mailto:tiktokpakistanmedia344@gmail.com?'));
  assert.ok(mailtoUrl.includes(encodeURIComponent(subject)));
});

test('invalid patient email triggers validation error', () => {
  const invalidEmailData: AppointmentFormData = {
    patientName: 'Amina',
    phoneNumber: '03293179587',
    patientEmail: 'invalid-email-format',
    patientAge: '25',
    appointmentDate: '2026-11-20',
    preferredTime: 'Evening',
    doctor: 'General',
    reason: 'General checkup'
  };

  const result = validateAppointmentForm(invalidEmailData);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.patientEmail);
});
