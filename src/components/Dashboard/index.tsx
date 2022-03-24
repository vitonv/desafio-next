import { Box, useColorModeValue, Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';


export function DashboardTemplate({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <Box minH="100vh">
            <Sidebar />
            <Header />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Flex w="100%" my="4" maxWidth={1420} mx="auto" flexDir="column" px={["6", "8"]}>
                    {children}
                </Flex>

            </Box>
        </Box>
    );
}

