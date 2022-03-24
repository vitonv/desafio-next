import { BoxProps, Box, useColorModeValue, Flex, CloseButton, useBreakpointValue, Heading } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsFillGrid1X2Fill, BsPeopleFill, BsPieChartFill } from "react-icons/bs";
import { useSidebarDrawer } from "../../hooks/contexts/SidebarDrawer";
import { NavItem } from "./NavItem";


interface LinkItemProps {
    name: string;
    icon: IconType;
    url: string
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: BsFillGrid1X2Fill, url: '/dashboard' },
    { name: 'Filiais', icon: BsPieChartFill, url: '/branches' },
    { name: 'Funcionários', icon: BsPeopleFill, url: '/employees' },
];


interface SidebarProps extends BoxProps {
}

export const SidebarNav = ({ ...rest }: SidebarProps) => {
    useBreakpointValue
    const { onClose } = useSidebarDrawer()
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('purple.500', 'purple.400')}
            w={{ base: 'full', md: 64 }}
            pos="fixed"
            color="white"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Flex justify="space-between" alignItems="space-between" w="100%" py="4">
                    <Heading fontFamily={'Cinzel'} color="white" letterSpacing="widest" fontWeight="400">Cabelex</Heading>
                    <CloseButton onClick={onClose} display={{ base: 'flex', md: 'none' }} />
                </Flex>
            </Flex>

            {
                LinkItems.map((link) => (
                    <NavItem key={link.name} url={link.url} icon={link.icon} alignSelf="end">
                        {link.name}
                    </NavItem>
                ))
            }

        </Box >
    );
};