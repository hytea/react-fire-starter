/* eslint-disable @typescript-eslint/no-magic-numbers */
import { AuthErrorCodes } from "#/authentication/Authenticate";

import { AppError } from "./AppError";
import { AuthErrorNumber } from "./error-numbers";

export class AuthError extends AppError {
  number: AuthErrorNumber;

  constructor(code: string, number?: AuthErrorNumber, message?: string) {
    const authError = AuthError.fromString(code);

    super(
      code,
      number || authError?.number || -1,
      message ||
        authError?.message ||
        "An error occurred. Please try again later.",
    );

    this.number = number || authError?.number || -1;
  }

  static fromString(code: string): AuthError | null {
    return (
      (Object.values(AuthError) as AuthError[]).find(
        (error) => error instanceof AuthError && error.code === code,
      ) || null
    );
  }
}

// Define type for AuthErrorCodes keys
type AuthErrorCodeKeys = keyof typeof AuthErrorCodes;

// Define type for static AuthError properties
type AuthErrorStatic = { [key in AuthErrorCodeKeys]: AuthError };

// Initialize static AuthError properties
const authErrorEntries: [AuthErrorCodeKeys, AuthErrorNumber, string][] = [
  [
    "ADMIN_ONLY_OPERATION",
    1,
    "This operation is restricted to administrators only.",
  ],
  ["ARGUMENT_ERROR", 2, "An invalid argument was provided."],
  [
    "APP_NOT_AUTHORIZED",
    3,
    "This app is not authorized to access Firebase Authentication.",
  ],
  ["APP_NOT_INSTALLED", 4, "The requested app is not installed."],
  [
    "CAPTCHA_CHECK_FAILED",
    5,
    "The CAPTCHA verification failed. Please try again.",
  ],
  ["CODE_EXPIRED", 6, "The code has expired. Please request a new one."],
  ["CORDOVA_NOT_READY", 7, "Cordova framework is not ready."],
  ["CORS_UNSUPPORTED", 8, "CORS is not supported by your browser."],
  [
    "CREDENTIAL_ALREADY_IN_USE",
    9,
    "This credential is already associated with another user.",
  ],
  [
    "CREDENTIAL_MISMATCH",
    10,
    "The provided credential does not match the expected credential.",
  ],
  [
    "CREDENTIAL_TOO_OLD_LOGIN_AGAIN",
    11,
    "Your credential is too old. Please log in again.",
  ],
  [
    "DEPENDENT_SDK_INIT_BEFORE_AUTH",
    12,
    "A dependent SDK was initialized before auth.",
  ],
  [
    "DYNAMIC_LINK_NOT_ACTIVATED",
    13,
    "Dynamic links are not activated for the current project.",
  ],
  ["EMAIL_CHANGE_NEEDS_VERIFICATION", 14, "Email change needs to be verified."],
  [
    "EMAIL_EXISTS",
    15,
    "The email address is already in use by another account.",
  ],
  ["EMULATOR_CONFIG_FAILED", 16, "Failed to configure the emulator."],
  [
    "EXPIRED_OOB_CODE",
    17,
    "This password reset link has expired, please request a new one.",
  ],
  ["EXPIRED_POPUP_REQUEST", 18, "The popup request has expired."],
  ["INTERNAL_ERROR", 19, "An internal error occurred. Please try again later."],
  ["INVALID_API_KEY", 20, "The provided API key is invalid."],
  ["INVALID_APP_CREDENTIAL", 21, "The app credential is invalid."],
  ["INVALID_APP_ID", 22, "The provided app ID is invalid."],
  ["INVALID_AUTH", 23, "The authentication request is invalid."],
  ["INVALID_AUTH_EVENT", 24, "The authentication event is invalid."],
  ["INVALID_CERT_HASH", 25, "The provided certificate hash is invalid."],
  ["INVALID_CODE", 26, "The provided code is invalid."],
  ["INVALID_CONTINUE_URI", 27, "The continue URL provided is invalid."],
  [
    "INVALID_CORDOVA_CONFIGURATION",
    28,
    "The Cordova configuration is invalid.",
  ],
  ["INVALID_CUSTOM_TOKEN", 29, "The provided custom token is invalid."],
  ["INVALID_DYNAMIC_LINK_DOMAIN", 30, "The dynamic link domain is invalid."],
  ["INVALID_EMAIL", 31, "The email address is invalid."],
  ["INVALID_EMULATOR_SCHEME", 32, "The emulator scheme is invalid."],
  ["INVALID_IDP_RESPONSE", 33, "Invalid username or password."],
  ["INVALID_MESSAGE_PAYLOAD", 34, "The message payload is invalid."],
  [
    "INVALID_MFA_SESSION",
    35,
    "The multi-factor authentication session is invalid.",
  ],
  ["INVALID_OAUTH_CLIENT_ID", 36, "The OAuth client ID is invalid."],
  ["INVALID_OAUTH_PROVIDER", 37, "The OAuth provider is invalid."],
  ["INVALID_OOB_CODE", 38, "This password reset link is invalid."],
  ["INVALID_ORIGIN", 39, "The origin of the request is invalid."],
  [
    "INVALID_PASSWORD",
    40,
    "The password is invalid or the user does not have a password.",
  ],
  ["INVALID_PERSISTENCE", 41, "The persistence type is invalid."],
  ["INVALID_PHONE_NUMBER", 42, "The phone number is invalid."],
  ["INVALID_PROVIDER_ID", 43, "The provider ID is invalid."],
  ["INVALID_RECIPIENT_EMAIL", 44, "The recipient email is invalid."],
  ["INVALID_SENDER", 45, "The sender email is invalid."],
  ["INVALID_SESSION_INFO", 46, "The session info is invalid."],
  ["INVALID_TENANT_ID", 47, "The tenant ID is invalid."],
  [
    "MFA_INFO_NOT_FOUND",
    48,
    "The multi-factor authentication info was not found.",
  ],
  ["MFA_REQUIRED", 49, "Multi-factor authentication is required."],
  ["MISSING_ANDROID_PACKAGE_NAME", 50, "The Android package name is missing."],
  ["MISSING_APP_CREDENTIAL", 51, "The app credential is missing."],
  ["MISSING_AUTH_DOMAIN", 52, "The auth domain is missing."],
  ["MISSING_CODE", 53, "The code is missing."],
  ["MISSING_CONTINUE_URI", 54, "The continue URL is missing."],
  ["MISSING_IFRAME_START", 55, "The iframe start is missing."],
  ["MISSING_IOS_BUNDLE_ID", 56, "The iOS bundle ID is missing."],
  ["MISSING_OR_INVALID_NONCE", 57, "The nonce is missing or invalid."],
  ["MISSING_MFA_INFO", 58, "The multi-factor authentication info is missing."],
  [
    "MISSING_MFA_SESSION",
    59,
    "The multi-factor authentication session is missing.",
  ],
  ["MISSING_PHONE_NUMBER", 60, "The phone number is missing."],
  ["MISSING_SESSION_INFO", 61, "The session info is missing."],
  ["MODULE_DESTROYED", 62, "The module has been destroyed."],
  ["NEED_CONFIRMATION", 63, "The operation needs confirmation."],
  [
    "NETWORK_REQUEST_FAILED",
    64,
    "The network request failed. Please try again.",
  ],
  ["NULL_USER", 65, "The user is null."],
  ["NO_AUTH_EVENT", 66, "No authentication event found."],
  ["NO_SUCH_PROVIDER", 67, "No such provider exists."],
  ["OPERATION_NOT_ALLOWED", 68, "The operation is not allowed."],
  ["OPERATION_NOT_SUPPORTED", 69, "The operation is not supported."],
  ["POPUP_BLOCKED", 70, "The popup was blocked by the browser."],
  ["POPUP_CLOSED_BY_USER", 71, "The popup was closed by the user."],
  [
    "PROVIDER_ALREADY_LINKED",
    72,
    "The provider is already linked to the user.",
  ],
  ["QUOTA_EXCEEDED", 73, "The quota has been exceeded."],
  ["REDIRECT_CANCELLED_BY_USER", 74, "The redirect was cancelled by the user."],
  [
    "REDIRECT_OPERATION_PENDING",
    75,
    "A redirect operation is already pending.",
  ],
  ["REJECTED_CREDENTIAL", 76, "The credential was rejected."],
  [
    "SECOND_FACTOR_ALREADY_ENROLLED",
    77,
    "The second factor is already enrolled.",
  ],
  [
    "SECOND_FACTOR_LIMIT_EXCEEDED",
    78,
    "The second factor limit has been exceeded.",
  ],
  ["TENANT_ID_MISMATCH", 79, "The tenant ID mismatch."],
  ["TIMEOUT", 80, "The operation timed out. Please try again."],
  ["TOKEN_EXPIRED", 81, "The token has expired."],
  [
    "TOO_MANY_ATTEMPTS_TRY_LATER",
    82,
    "Too many attempts. Please try again later.",
  ],
  ["UNAUTHORIZED_DOMAIN", 83, "The domain is not authorized."],
  ["UNSUPPORTED_FIRST_FACTOR", 84, "The first factor is not supported."],
  ["UNSUPPORTED_PERSISTENCE", 85, "The persistence type is not supported."],
  [
    "UNSUPPORTED_TENANT_OPERATION",
    86,
    "The tenant operation is not supported.",
  ],
  ["UNVERIFIED_EMAIL", 87, "The email address is not verified."],
  ["USER_CANCELLED", 88, "The user cancelled the operation."],
  ["USER_DELETED", 89, "The user has been deleted."],
  ["USER_DISABLED", 90, "The user has been disabled."],
  ["USER_MISMATCH", 91, "The user credentials do not match."],
  ["USER_SIGNED_OUT", 92, "The user has been signed out."],
  ["WEAK_PASSWORD", 93, "The password is not strong enough."],
  [
    "WEB_STORAGE_UNSUPPORTED",
    94,
    "Web storage is not supported by your browser.",
  ],
  ["ALREADY_INITIALIZED", 95, "The app is already initialized."],
];

authErrorEntries.forEach(([key, number, message]) => {
  (AuthError as unknown as AuthErrorStatic)[key] = new AuthError(
    AuthErrorCodes[key],
    number,
    message,
  );
});
