import { AddEmployeeParams, Employee, UpdateEmployeeParams } from "../../interfaces/employee";
import { api } from "../../services/api";



async function getEmployees(branch_id?: string): Promise<Employee[]> {
    const { data } = await api.get('employees', {
        params: { branch_id }
    })
    return data;
}

async function createEmployee({ name, branch_name }: AddEmployeeParams) {
    await api.post('/employees', {
        name,
        branch_name,
    });
}
async function updateEmployee({ id, name, branch_name }: UpdateEmployeeParams) {
    await api.patch(`employees/${id}`, {
        name,
        branch_name,
    });
}
async function deleteEmployee(id: string) {
    await api.delete(`employees/${id}`);
}


export function useEmployees() {

    return {
        createEmployee,
        getEmployees,
        updateEmployee,
        deleteEmployee
    }

}