export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    token: string;
    role: string;
  }
  
  export interface LoginFormValue {
    email: string;
    password: string;
  }