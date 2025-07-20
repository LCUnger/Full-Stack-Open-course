export interface UserEntryType {
  username: string,
  password: string,
  name: string,
}

export interface UserType {
  username: string
  passwordHash?: string
  name: string
  id?: string
}

export interface DbUserType extends UserType, Document {}