import React from "react";
import {
    chakra,
    Box,
    Image,
    Flex,
    Icon,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import NextLink from 'next/link'
import { BsPeopleFill } from "react-icons/bs";
import { RemoveBranchAlert } from "./RemoveBranchAlert";
import { UpdateBranchModal } from "../Modal/UpdateBranchModal";



export interface BranchProps {
    id?: string;
    name: string;
    employees: number;
}
export function BranchCard({ id, name, employees }: BranchProps) {

    return (
        <Flex

            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                w="sm"
                mx="auto"
                bg={useColorModeValue("white", "gray.800")}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
            >
                <Image
                    w="full"
                    h={56}
                    fit="cover"
                    objectPosition="center"
                    src="/images/saloon.jpeg"
                    alt="avatar"
                />

                <Flex alignItems="center" justifyContent="center" px={6} py={3} bg="purple.400">
                    <chakra.h1 mx={3} color="white" fontWeight="normal" fontSize="lg" >
                        {name}
                    </chakra.h1>
                </Flex>

                <Box py={4} px={6}>
                    <chakra.h1
                        fontFamily='Inter   '
                        fontSize="xl"
                        fontWeight="bold"
                        color={useColorModeValue("gray.800", "white")}
                    >
                        {employees} funcionários
                    </chakra.h1>

                    <NextLink href={`/branches/${id}`} passHref>
                        <Link
                            _hover={{
                                textStyle: 'none'
                            }}
                            display="flex"
                            alignItems="center"
                            mt={4}
                            color={useColorModeValue("gray.700", "gray.200")}
                        >
                            <Icon as={BsPeopleFill} h={6} w={6} mr={2} />

                            <chakra.h1 px={2} fontSize="sm">
                                Ver funcionários
                            </chakra.h1>
                        </Link>
                    </NextLink>
                    <UpdateBranchModal id={id} name={name} />
                    <RemoveBranchAlert id={id} name={name} />
                </Box>
            </Box>
        </Flex >
    );
};
