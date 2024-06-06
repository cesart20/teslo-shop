import { useContext, useState } from "react"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from "@mui/material"
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { CartContext, UIContext } from "@/context"

export const Navbar = () => {

    const {asPath, push} = useRouter();
    const {toggleSideMenu} = useContext(UIContext);
    const {numberOfItems} = useContext(CartContext);

    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');


    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`);
    }
    

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' style={{ textDecoration: 'none' }}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ ml: 1 }}>Shop</Typography>
                </Box>
            </NextLink>

            <Box flex={1} />

            <Box sx={{display: isSearchVisible ? 'none' : {xs: 'none', sm: 'block'}}}
                className="fadeIn"
            >
                <NextLink href='/category/men'>
                    <Button color={asPath === '/category/men' ? 'primary' : 'info'}>
                        Hombres
                    </Button>
                </NextLink>

                <NextLink href='/category/women'>
                    <Button color={asPath === '/category/women' ? 'primary' : 'info'}>
                        Mujeres
                    </Button>
                </NextLink>

                <NextLink href='/category/kid'>
                    <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>
                        Niños
                    </Button>
                </NextLink>
            </Box>


            <Box flex={1} />

            {/* pantallas grandes */}

            {
                isSearchVisible
                    ?
                    (
                        <Input
                            sx={{display: {xs: 'none', sm: 'flex'}}}
                            className="fadeIn"
                            autoFocus
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ () => setIsSearchVisible(false) }
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )
                    :
                    (
                        <IconButton
                            sx={{display: {xs: 'none', sm: 'flex'}}}
                            onClick={ () => setIsSearchVisible(true) }
                            className="fadeIn"
                        >
                            <SearchOutlined />
                        </IconButton>
                    )

            }

            

            {/* pantallas pequeñas */}
            <IconButton
                sx={{ display: { xs: 'flex', sm: 'none' } }}
                onClick={toggleSideMenu}
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref>
                <IconButton>
                    <Badge badgeContent={numberOfItems > 9 ? '9+' : numberOfItems } color='secondary'>
                        <ShoppingCartOutlined />
                    </Badge>
                </IconButton>
            </NextLink>

            <Button onClick={toggleSideMenu}>
                Menu
            </Button>
        </Toolbar>
    </AppBar>
  )
}
