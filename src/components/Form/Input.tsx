import { FormControl, FormErrorMessage, FormLabel, Icon, Input as ChakraInput, InputGroup, InputLeftElement, InputProps as ChakraInputProps } from "@chakra-ui/react"

import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string
    error?: FieldError
    icon: IconType
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ icon, name, label, error = null, ...rest }: InputProps, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel>{label}</FormLabel>}
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                >
                    <Icon fontSize="1.3rem" as={icon}></Icon>
                </InputLeftElement>
                <ChakraInput
                    _placeholder={{
                        color: 'gray.600'
                    }}
                    ref={ref}
                    id={name}
                    name={name}
                    focusBorderColor='purple.500'
                    size="md"
                    {...rest}
                />
            </InputGroup>
            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl >
    )
}

export const Input = forwardRef(InputBase);