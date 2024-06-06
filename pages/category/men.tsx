import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import { FullScreenLoading } from "@/components/ui"
import { useProducts } from "@/hooks"
import { Typography } from "@mui/material"


const MenPage = () => {

  const {products, isLoading} = useProducts('/products?gender=men')

  return (
    <ShopLayout title="Men - Tesla-Shop" pageDescription={'Section MEN en Teslo Shop'}>
      <Typography variant="h1" component="h1">Hombres</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Todos los productos para los hombres</Typography>
      {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={products} />
      }

    </ShopLayout>
  )
}

export default MenPage