import {FC, useState, useMemo} from 'react'
import NextLink from 'next/link'
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Typography } from '@mui/material'
import { IProduct } from '@/Interfaces'

interface Props {
    product: IProduct
}

export const ProductCard: FC<Props> = ({product}) => {


    const [isMovered, setIsMovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const productImage = useMemo(() => {
        return isMovered
        ? `/products/${product.images[1]}`
        : `/products/${product.images[0]}`
    }, [isMovered, product.images])

  return (
    <Grid
        item
        xs={6}
        sm={4}
        onMouseEnter={() => setIsMovered(true)}
        onMouseLeave={() => setIsMovered(false)}
    >
        <Card>
            <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                
                <CardActionArea>
                    {
                        (product.inStock === 0) && (
                            <Chip
                                color='primary'
                                label='No hay disponible'
                                sx={{position: 'absolute', zIndex: 99, top: '10px', left: '10px'}}
                            />
                        )

                    }
                    <CardMedia 
                        component='img'
                        className='fadeIn'
                        image={productImage}
                        alt={product.title}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </CardActionArea>
            </NextLink>
        </Card>

        <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none'}} className='fadeIn'>
            <Typography fontWeight={700}>{product.title}</Typography>
            <Typography fontWeight={500}>{`$${product.price}`}</Typography>
        </Box>
    </Grid>
            
  )
}
