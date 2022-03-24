import { Stat, useColorModeValue, Flex, Box, StatLabel, StatNumber, Heading, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface StatsCardProps {
    title: string;
    stat: number;
    icon?: IconType;
}
export function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props;
    return (
        <Stat
            px={["4", "8"]}
            py={["4", "12"]}
            shadow={'xl'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'center'}>
                <Box>
                    <StatLabel>
                        <Heading size={"md"}>{title}</Heading>
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    <Icon as={icon} fontSize="xl" />
                </Box>
            </Flex>
        </Stat>
    );
}