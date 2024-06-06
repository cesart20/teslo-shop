import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import { FullScreenLoading } from "@/components/ui"
import { useProducts } from "@/hooks"
import { Typography } from "@mui/material"


const WomenPage = () => {


    const {products, isLoading} = useProducts('/products?gender=women')


  return (
    <ShopLayout title="Women - Tesla-Shop" pageDescription={'Section WOMEN en Teslo Shop'}>
      <Typography variant="h1" component="h1">Mujeres</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Todos los productos para las mujeres</Typography>
      {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={products} />
      }


    </ShopLayout>
  )
}

export default WomenPage