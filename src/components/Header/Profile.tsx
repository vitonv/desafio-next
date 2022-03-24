import { Flex, Menu, MenuButton, HStack, Avatar, VStack, Box, MenuList, useColorModeValue, MenuItem, Text } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { useAuth } from "../../hooks/contexts/AuthContext";


export function Profile() {
    const { name, signOut } = useAuth()

    return (
        <Flex alignItems={'center'}>
            <Menu>
                <MenuButton
                    py={2}
                    transition="all 0.3s"
                    _focus={{ boxShadow: 'none' }}>
                    <HStack>
                        <Avatar
                            size={'md'}
                            src="/images/logo.png"
                            name={name}
                        />
                        <VStack
                            alignItems="flex-start"
                            spacing="1px"
                            ml="2">
                            <Text fontSize="sm">{name || 'Administrador'}</Text>
                            <Text fontSize="xs" color="gray.600">
                                Administrador(a)
                            </Text>
                        </VStack>
                        <Box >
                            <FiChevronDown />
                        </Box>
                    </HStack>
                </MenuButton>
                <MenuList
                    bg={useColorModeValue('white', 'gray.900')}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}>
                    <MenuItem
                        _hover={{
                            background: 'purple.500',
                            color: 'white'
                        }}
                        onClick={signOut}
                    >
                        Sair
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex >
    )
}