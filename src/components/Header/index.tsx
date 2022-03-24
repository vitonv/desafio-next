import { Flex, FlexProps, HStack, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useSidebarDrawer } from "../../hooks/contexts/SidebarDrawer";
import { Profile } from "./Profile";

interface HeaderProps extends FlexProps {
}
export const Header = ({ ...rest }: HeaderProps) => {
    const { onOpen } = useSidebarDrawer()
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <HStack spacing={{ base: '0', md: '6' }}>
                <Profile />
            </HStack>
        </Flex>
    );
};