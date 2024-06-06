
import { GetServerSideProps } from 'next'
import { ShopLayout } from '@/components/layouts'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { jwt } from '@/utils'

const AddressPage = () => {
  return (
    <ShopLayout title='Dirección' pageDescription='Confirmar direccion del destino'>
        <Typography variant='h1' component='h1'>Dirección</Typography>

        <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12} sm={6}>
                <TextField label='Nombre' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Apellido' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Direccion' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Direccion 2' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Codigo Postal' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select
                        variant='filled'
                        label='Pais'
                        value={1}
                    >
                        <MenuItem value={1}>Paraguay</MenuItem>
                        <MenuItem value={2}>Argentina</MenuItem>
                        <MenuItem value={3}>Brasil</MenuItem>
                        <MenuItem value={4}>Uruguay</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Ciudad' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Telefono' variant='filled' fullWidth />
            </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
            <Button color='secondary' className='circular-btn' size='large'>
                Guardar direccion
            </Button>
        </Box>
    </ShopLayout>
  )
}


// export const getServerSideProps: GetServerSideProps = async ({req}) => {
    
//     const {token = ''} = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken(token);
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if (!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }


//     return {
//         props: {
            
//         }
//     }
// }


export default AddressPage