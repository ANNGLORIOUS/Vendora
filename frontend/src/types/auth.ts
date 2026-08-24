export type LoginPayload = {
  email: string
  password: string
}

export type AuthUser = {
  id: number
  email: string
  first_name?: string
  last_name?: string
}

export type AuthResponse = {
  access: string
  refresh: string
  user: AuthUser
}
