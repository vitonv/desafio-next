import { Box, Flex, Heading, Spinner, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { DashboardTemplate } from "../../components/Dashboard";
import EmployeeCard from "../../components/EmployeeCard";
import { AddEmployeeModal } from "../../components/Modal/AddEmployeeModal";
import { useBranches } from "../../hooks/services/useBranches";
import { useEmployees } from "../../hooks/services/useEmployees";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function ListBranchEmployees(props) {
    const id = props.id
    const { getEmployees } = useEmployees()
    const { getBrancheById } = useBranches()
    const results = useQueries([
        { queryKey: ['branches', id.toString()], queryFn: () => getBrancheById(id) },

        { queryKey: ['employees', id.toString()], queryFn: () => getEmployees(id) },
    ])
    const [branch, employees] = results

    return (
        <DashboardTemplate>
            <Box flex="1" borderRadius={8} bg="white" p="8">
                <Flex mb="8" justify="space-between" align="center" flexWrap={"wrap"}>
                    <Heading
                        color="gray.700"
                        variant={'h1'}
                        fontSize='4xl'
                    >
                        Funcionários
                        {!employees.isLoading && employees.isFetching && <Spinner ml={4} />}
                    </Heading>
                    {branch.isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : branch.error ? (
                        <Flex justify="center">
                            <Heading>Falha ao obter dados</Heading>
                        </Flex>) :
                        branch.data.map(branch => (
                            <>
                                <Heading key={branch.id}>Filial {branch.name} </Heading>
                                <AddEmployeeModal branch_name={branch.name} />
                            </>
                        ))
                    }

                </Flex>

                <SimpleGrid minChildWidth="280px" w="100%" spacing={["6", "8"]}>
                    {employees.isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : employees.error ? (
                        <Flex justify="center">
                            <Heading>Falha ao obter dados</Heading>
                        </Flex>
                    ) : (
                        employees.data.map(employee => (
                            <EmployeeCard
                                key={employee.id}
                                id={employee.id}
                                name={employee.name}
                                branch={employee.branch.name}
                            />
                        ))
                    )
                    }


                </SimpleGrid>
            </Box>
        </DashboardTemplate >
    )
}
export const getServerSideProps = withSSRAuth(async (ctx) => {
    const id = ctx.query.id.toString();
    return {
        props: {
            id
        }
    }
})