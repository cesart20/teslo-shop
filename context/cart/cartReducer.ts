import { ICartProduct } from '@/Interfaces';
import { CartState } from './';


type CartActionType = 
| { type: 'Cart - LoadCart from cookies | storage', payload: ICartProduct[]}
| { type: 'Cart - Update products in cart', payload: ICartProduct[] }
| { type: 'Cart - Change cart quantity', payload: ICartProduct }
| { type: 'Cart - Remove product in cart', payload: ICartProduct }
| { 
    type: 'Cart - Update order summary',
    payload: {
      numberOfItems: number,
      subTotal: number,
      tax: number,
      total: number
    } 
  }



export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
      case 'Cart - LoadCart from cookies | storage':
        return {
          ...state,
          isLoaded: true,
          cart: [ ...action.payload ]
        }

      case 'Cart - Update products in cart':
        return {
          ...state,
          cart: [ ...action.payload ]
        }
      
      case 'Cart - Change cart quantity':
        return {
          ...state,
          cart: state.cart.map( productInCart => {
            if (productInCart._id !== action.payload._id) return productInCart;
            if (productInCart.size !== action.payload.size) return productInCart;

            return action.payload;
          })
        }
      
      case 'Cart - Remove product in cart':
        return {
          ...state,
          // remover el producto por id y size
          // cart: state.cart.filter( productInCart => productInCart._id !== action.payload._id || productInCart.size !== action.payload.size)
          cart: state.cart.filter( productInCart => !(productInCart._id === action.payload._id && productInCart.size === action.payload.size))
          // cart: state.cart.filter( productInCart => {
          //   if ( productInCart._id === action.payload._id && productInCart.size === action.payload.size) {
          //     return false;
          //   }
          //   return true;
          // })
        }

      case 'Cart - Update order summary':
        return {
          ...state,
          ...action.payload
        }
    

      default:
        return state;
   }
}