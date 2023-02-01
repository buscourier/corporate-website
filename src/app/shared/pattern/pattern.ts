export const Pattern = {
  Text: /^[a-zа-яA-ZА-Я-\s]+$/,
  TextWithNumbers: /^[a-zA-Z][a-zA-Z0-9-_\\.]{1,1000}$/,
  Numbers: /^[0-9]+$/,
  TextWithNumbersAndSymbols: /^[a-zа-яA-ZА-Я0-9-.,\s]+$/,
  Phone: /(|(\(\d{3}\)?)|(\d{3}-))?\d{3}-\d{4}/,
  // Phone: /(|(\(\d{3}\)?)|(\d{3}-))?\d{3}-\d{4}/,
  RusPassport: /(\d{4} \d{6})/,
  DriverLicense: /(\d{2} \d{2} \d{6})/,
  email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/,
}
