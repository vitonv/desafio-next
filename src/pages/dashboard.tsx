import { Heading, Container, SimpleGrid, Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import { BsPeopleFill, BsPieChartFill } from 'react-icons/bs';
import { useQueries } from 'react-query';
import { DashboardTemplate } from '../components/Dashboard';
import { StatsCard } from '../components/StatsCard';
import { useBranches } from '../hooks/services/useBranches';
import { useEmployees } from '../hooks/services/useEmployees';
import { withSSRAuth } from '../utils/withSSRAuth';


const stats = [
    { label: 'Total de funcionários', value: '71,887' },
    { label: 'Total de filiais', value: '56.87%' },
]
export default function Dashboard() {
    const { getBranches } = useBranches()
    const { getEmployees } = useEmployees()
    const results = useQueries([
        { queryKey: 'branches', queryFn: () => getBranches() },

        { queryKey: 'employees', queryFn: () => getEmployees() },
    ])
    const [branches, employees] = results
    return (
        <DashboardTemplate>
            <Box flex="1" borderRadius={8} bg="white" p="8">
                <Heading
                    variant={'h1'}
                    textAlign={'center'}
                    fontSize={'4xl'}
                    pb={10}
                    fontWeight={'bold'}>
                    O que a nossa empresa anda fazendo?
                </Heading>
                <Container>
                    {(branches.isLoading || employees.isLoading) ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : (
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
                            <StatsCard icon={BsPieChartFill} key="branch" title={'Total de filiais'} stat={0 || branches.data.length} />
                            <StatsCard icon={BsPeopleFill} key="employee" title={'Total de funcionários'} stat={employees.data.length} />
                        </SimpleGrid>
                    )
                    }
                </Container>
            </Box>


        </DashboardTemplate>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})