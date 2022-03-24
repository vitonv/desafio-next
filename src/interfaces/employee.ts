import { Branch } from './branch';

export interface AddEmployeeParams {
  name: string;
  branch_name: string;
}
export interface DeleteEmployeeParams {
  id: string;
}

export interface UpdateEmployeeParams {
  id: string;
  name: string;
  branch_name: string;
}
export interface Employee {
  id: string;
  name: string;
  branch: Omit<Branch, 'employees'>;
}