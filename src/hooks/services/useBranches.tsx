import { api } from "../../services/api";



type Branch = {
    id: string;
    name: string;
    employees: number
}
async function getBranches(): Promise<Branch[]> {
    const { data } = await api.get('branches')
    return data;
}
async function getBrancheById(id: string): Promise<Branch[]> {
    const { data } = await api.get('branches', {
        params: { id }
    })
    return data;
}

async function createBranch(name: string) {
    await api.post('branches', {
        name,
    });
}
async function updateBranch({ id, name }) {
    await api.patch(`branches/${id}`, {
        name,
    });
}
async function deleteBranch(id: string) {
    await api.delete(`branches/${id}`);
}


export function useBranches() {

    return {
        createBranch,
        getBranches,
        getBrancheById,
        updateBranch,
        deleteBranch
    }

}