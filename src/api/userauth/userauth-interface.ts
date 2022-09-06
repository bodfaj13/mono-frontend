export interface userSigninPayload {
  email: string,
  password: string
}

export interface userSignupPayload extends userSigninPayload {
  firstName: string,
  lastName: string,
}