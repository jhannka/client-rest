import {IDepartment} from "./department";

export interface IUser {
  id: number;
  names: string;
  last_name: string;
  birth_date: Date;
  email: string;
  identification_card: string;
  salary: number;
  state: boolean;
  created_at?: Date;
  updated_at?: Date;
  roles?: IRole[];
  must_change_password: boolean;
  department_id: number;
  department?: IDepartment;
}

export interface IRole {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IResetPassword {
  id: number;
  password: string
}
