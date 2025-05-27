// Define a regular expression that combines all password requirements:

// (?=.*?[A-Z]): At least one uppercase character
// (?=.*?[a-z]): At least one lowercase character
// (?=.*?[0-9]): At least one digit
// (?=.*?[^a-zA-Z0-9]): At least one non-alphanumeric character
// .{8,}: At least 8 characters in total

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,}$/;

export const AuthConfig = {
  passwordRegex: PASSWORD_REGEX,
};
