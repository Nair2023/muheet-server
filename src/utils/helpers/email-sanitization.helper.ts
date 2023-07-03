export function emailSanitization(email: string): string {
  email = email.toLowerCase();
  const regex = /\+(\w*|\d+)/;
  const sanitizedEmail = email.replace(regex, '');
  return sanitizedEmail;
}
