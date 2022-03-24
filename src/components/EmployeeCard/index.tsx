import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import { UpdateEmployeeModal } from '../Modal/UpdateEmployeeModal';
import { RemoveEmployeeAlertDialog } from './RemoveModalAlert';


interface EmployeeCardProps {
    id: string
    name: string
    branch: string
}
export default function EmployeeCard({ id, name, branch }: EmployeeCardProps) {
    return (
        <Center py={6}>
            <Box
                maxW={'280px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}

                    mb={4}

                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {name}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4} fontSize='sm'>
                    {branch}
                </Text>

                <Stack mt={8} direction={'row'} spacing={4}>
                    <UpdateEmployeeModal id={id} name={name} branch={branch} />
                    <RemoveEmployeeAlertDialog name={name} id={id} />
                </Stack>
            </Box>
        </Center>
    );
}