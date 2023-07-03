import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';

export function phoneNumberParser(phone: string, countryCode?: string): string {
  const countryISOCode = countryCode || 'JO';

  const phoneNumber = parsePhoneNumber(phone, countryISOCode as CountryCode);

  const result: string = phoneNumber.formatNational();

  return result.replace(/\s/g, '');
}
