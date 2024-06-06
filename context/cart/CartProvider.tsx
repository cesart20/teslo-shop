import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie'


import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/Interfaces';

export interface CartState {
    isLoaded: boolean
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}


export const CartProvider: FC<{children: ReactNode}> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            // const storageProducts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [];
            const cookieProducts = Cookies.get('cart') ? JSON.parse( Cookies.get('cart')! ): [];
            dispatch({ type: 'Cart - LoadCart from cookies | storage', payload: cookieProducts });

    
            // if (cookieProducts.length > 0) {
            //     dispatch({ type: 'Cart - LoadCart from cookies | storage', payload: cookieProducts });
            // }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
    }, []);
    

    useEffect(() => {
        Cookies.set('cart', JSON.stringify(state.cart), { expires: 7 })
        // localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])


    useEffect(() => {
        const numberOfItems = state.cart.reduce( (prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce( (prev, current) => current.quantity * current.price + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }
        dispatch({type: 'Cart - Update order summary', payload: orderSummary});
    }, [state.cart])


    
    

    const addProductToCart = (product: ICartProduct) => {
        // nivel 1
        // dispatch({type: 'Cart - Add Product', payload: product})


        // nivel 2
        // const productsInCart = state.cart.find(item => item._id !== product._id && item.size !== product.size)
        // dispatch({type: 'Cart - Add Product', payload: [...productsInCart, product]})

        // nivel 3
        const productInCart = state.cart.some(p => p._id === product._id)
        if(!productInCart) return dispatch({type: 'Cart - Update products in cart', payload: [...state.cart, product]})
        
        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size)
        if(!productInCartButDifferentSize) return dispatch({type: 'Cart - Update products in cart', payload: [...state.cart, product]})
    
        // Acumular
        const updateProducts = state.cart.map ( p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            
            return p;
        })

        dispatch({type: 'Cart - Update products in cart', payload: updateProducts})
    }


    const updateCartQuantity = (product: ICartProduct) => {
        dispatch ({type: 'Cart - Change cart quantity', payload: product})
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch ({type: 'Cart - Remove product in cart', payload: product})
    }

return (
    <CartContext.Provider value={{
       ...state,

       // Methods
       addProductToCart,
       updateCartQuantity,
       removeCartProduct,
     }}>
        {children}
     </CartContext.Provider>
  )
}