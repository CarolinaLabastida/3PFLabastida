export interface User {
    id: number,
    name: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    token: string,
    role: string,
  }
  
  export interface LoginFormValue {
    email: string,
    password: string,
  }

  export interface FormDataUser {
    name: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    role: string,
  }