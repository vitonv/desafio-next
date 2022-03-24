import { FlexProps, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";
import NextLink from 'next/link'
interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    url: string;
}
export const NavItem = ({ icon, children, url, ...rest }: NavItemProps) => {
    return (
        <NextLink href={url} passHref>
            <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        bg: 'purple.600',
                        color: 'white',
                    }}
                    _active={{
                        bg: 'purple.600',
                        color: 'white',
                    }}
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            _groupHover={{
                                color: 'primary.500',
                            }}
                            as={icon}
                        />
                    )}
                    <Text fontWeight="600" letterSpacing="wider">{children}</Text>
                </Flex>
            </Link>
        </NextLink>
    );
};