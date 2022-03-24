export type Branch = {
    id: string;
    name: string;
    employees: number
}

export type CreateBranchParams =  {
    name: string;
  }
  export type UpdateBranchParams = CreateBranchParams 