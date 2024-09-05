export function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/[\(\)\-\s]/g, "");

  const formatted = `+55${cleaned}`;

  return formatted;
}
