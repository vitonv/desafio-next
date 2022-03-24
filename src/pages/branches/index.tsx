import { Box, Flex, Heading, Spinner, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { BranchCard } from "../../components/BranchCard";
import { DashboardTemplate } from "../../components/Dashboard";
import { AddBranchModal } from "../../components/Modal/AddBranchModal";
import { useBranches } from "../../hooks/services/useBranches";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function ListBranches() {
    const { getBranches } = useBranches()
    const { data, isLoading, isFetching, error } = useQuery('branches', getBranches)

    return (
        <DashboardTemplate>
            <Box flex="1" borderRadius={8} bg="white" p="8">
                <Flex mb="8" justify="space-between" align="center" flexWrap={"wrap"}>
                    <Heading
                        color="gray.700"
                        variant={'h1'}
                        fontSize='4xl'
                    >
                        Filiais
                        {!isLoading && isFetching && <Spinner ml={4} />}
                    </Heading>
                    <AddBranchModal />
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
                        data.map(branch => (
                            <BranchCard
                                key={branch.id}
                                id={branch.id}
                                name={branch.name}
                                employees={branch.employees}
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
    return {
        props: {}
    }
})