import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { Typography } from "@mui/material";


export default function HomePage() {
  
 const {products, isLoading} = useProducts('/products')

  return (
    <ShopLayout title="Tesla-Shop" pageDescription={'Encuentra los mejores productos en Teslo Shop'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Todos los productos</Typography>
      {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={products} />
      }

    </ShopLayout>
  )
    
}
