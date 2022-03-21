import { extendTheme } from '@chakra-ui/react';


export const theme = extendTheme({
    colors: {
        success:"#62CC30",
        warning:"#F29B19",
        error:"#D93A3A",

      
      },
    fonts:{
        heading:'Inter',
        body: 'Inter'
    },
    components:{
        Button:{
            defaultProps:{
                colorScheme:'purple'
            }
        },
    },
    styles:{
        global:{
            body:{
                bg:"purple.50"
            },
        }
    }
})