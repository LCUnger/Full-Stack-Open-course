export interface UserType {
  username: string
  password: string
  name: string
}

export interface DbUserType extends UserType, Document {}