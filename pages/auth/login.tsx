import { useState, useContext } from 'react'
import { AuthLayout } from '@/components/layouts'
import NextLink from 'next/link'
import { Box, Grid, Typography, TextField, Button, Chip } from '@mui/material'
import { useForm } from 'react-hook-form'
import { validations } from '@/utils'
import { tesloApi } from '@/api'
import { ErrorOutline } from '@mui/icons-material'
import { AuthContext } from '@/context'
import { useRouter } from 'next/router'

type FormData = {
    email: string
    password: string
}


const LoginPage = () => {

    const router = useRouter();

    const {loginUser} = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onLoginUser = async({email, password}: FormData) => {

        setShowError(false);

        const isValidLogin = await loginUser(email, password);

        if ( !isValidLogin ) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);

            return;
        }
        
        // try {
        //     const {data} = await tesloApi.post('/user/login', { email,password });
        //     const { token, user } = data;
        //     console.log({token, user});
            
        // } catch (error: any) {
        //     console.log("Error en las credenciales");
        //     setShowError(true);
        //     setTimeout(() => {
        //         setShowError(false);
        //     }, 3000);
        // }

        // TODO: navegar a la panalla que el usuario estaba buscando

        const destination = router.query.p?.toString() || '/'
        router.replace(destination);
    }




  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{width: 350, padding: '10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>

                        <Chip
                            label='No reconocemos ese usuario / contraseña'
                            color='error'
                            icon={<ErrorOutline />}
                            className='fadeIn'
                            sx={{ display: showError ? 'flex' : 'none'}}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type='email'
                            label='Correo'
                            variant='filled'
                            fullWidth
                            { ...register('email', {
                                required: 'Este campo es requerido',
                                validate: validations.isEmail,
                            })}
                            error={!!(errors.email)}
                            helperText={errors.email?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            variant='filled'
                            fullWidth
                            { ...register('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                            })}
                            error={!!(errors.password)}
                            helperText={errors.password?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type='submit' color='secondary' className='circular-btn' fullWidth size='large'>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href={router.query.p ? `/auth/register?p=${ router.query.p }` : '/auth/register'} passHref>
                            ¿No tienes cuenta?
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default LoginPage