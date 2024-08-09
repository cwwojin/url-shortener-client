/** Sign up */
export interface SignUpDto {
  email: string;
  password: string;
}

/** Update Password */
export interface UpdatePasswordDto {
  password: string;
  newPassword: string;
}

/** Sign out */
export interface SignOutDto {
  password: string;
}

/* ====================================================== */
/* START File API                                         */
/* ====================================================== */

/** Upload Profile Image */
export interface UpdateProfileImageDto {
  file: File;
}

/* ====================================================== */
/* END File API                                           */
/* ====================================================== */
