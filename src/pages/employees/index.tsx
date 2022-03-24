import { Box, Flex, Heading, Spinner, Button, Icon, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { DashboardTemplate } from "../../components/Dashboard";
import EmployeeCard from "../../components/EmployeeCard";
import { AddEmployeeModal } from "../../components/Modal/AddEmployeeModal";
import { useEmployees } from "../../hooks/services/useEmployees";

export default function ListEmployees() {
    const { getEmployees } = useEmployees()

    const { data, isLoading, isFetching, error } = useQuery('employees', async () => {
        const employees = await getEmployees()
        return employees
    })

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
                        {!isLoading && isFetching && <Spinner ml={4} />}
                    </Heading>
                    <AddEmployeeModal />
                </Flex>
                <SimpleGrid minChildWidth="280px" w="100%" spacing={["6", "8"]}>
                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Heading>Falha ao obter dados</Heading>
                        </Flex>
                    ) : (
                        data.map(employee => (
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