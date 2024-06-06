import NextLink from "next/link"
import { CartList, OrderSumary } from "@/components/cart"
import { ShopLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"


const SummaryPage = () => {
  return (
    <ShopLayout title="Resumen de orden" pageDescription={'Resumen de la orden'}>
        <Typography variant="h1" component="h1">Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
               <CartList />
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className="sumary-card">
                    <CardContent>
                        <Typography variant="h2">Resumen (3 productos)</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant="subtitle1">Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                Editar
                            </NextLink>
                        </Box>

                        <Typography>Cesar Ivan</Typography>
                        <Typography>Calle falsa 123</Typography>
                        <Typography>Calle 2</Typography>
                        <Typography>Capiata</Typography>
                        <Typography>+959981</Typography>


                        <Divider sx={{ my: 1 }} />
                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href='/cart' passHref>
                                Editar
                            </NextLink>
                        </Box>
                        <OrderSumary />

                        <Box sx={{mt:3}}>
                            <Button color="secondary" className="circular-btn" fullWidth>
                                Confirmar pedido
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>


    </ShopLayout>
  )
}

export default SummaryPage