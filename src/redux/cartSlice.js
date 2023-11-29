// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  Cartitems: localStorage.getItem('Cartitems')
    ? JSON.parse(localStorage.getItem('Cartitems'))
    : [],
  CartTotalA: 0,
  CartTotalQ: 0,
  user: localStorage.getItem('user') // Retrieve user from localStorage
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true', 
  // Retrieve isAuthenticated from localStorage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemindex=state.Cartitems.findIndex(
        (item) => item._id==action.payload._id
      );
      if(itemindex>=0){
        state.Cartitems[itemindex].cartQuantiy+=1;
      }else{
         const temp={...action.payload,cartQuantiy:1};
         state.Cartitems.push(temp);
         toast.success(`${action.payload.model} to redux`, {
          position: 'top-center',
        });
        localStorage.setItem('Cartitems', JSON.stringify(state.Cartitems));
      }; 
    },
    removeFromcart(state, action) {
      const itemIdToRemove = action.payload.model;
      state.Cartitems = state.Cartitems.filter(
        (cartItem) => cartItem.model !== itemIdToRemove
      );
      localStorage.setItem('Cartitems', JSON.stringify(state.Cartitems));
      toast.error(`${action.payload.model} is deleted from redux`, {
        position: 'top-center',
      });
    },
    clearFromcart(state, action) {
      state.Cartitems = [];
      localStorage.setItem('Cartitems', JSON.stringify(state.Cartitems));
      toast.error(`all items are deleted from redux`, {
        position: 'top-center',
      });
    },
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Save user and isAuthenticated to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      // Remove user and isAuthenticated from localStorage
      localStorage.removeItem('user');
      localStorage.setItem('isAuthenticated', 'false');
    },
    decreaseCart(state,action){
      const itemindex=state.Cartitems.findIndex(
        (item) => item._id==action.payload._id
      );
      if(state.Cartitems[itemindex].cartQuantiy>1){
        state.Cartitems[itemindex].cartQuantiy-=1
      }
      else if(stateCcartItem[itemindex].cartQuantiy==1){
        const itemIdToRemove = action.payload.model;
        state.Cartitems = state.Cartitems.filter(
          (cartItem) => cartItem.model !== itemIdToRemove
        );
        toast.error(`${action.payload.model} is deleted from redux`, {
          position: 'bottom-left',
        });
      }
      localStorage.setItem('Cartitems', JSON.stringify(state.Cartitems));
    },
    inCart(state,action){
      const itemindex=state.Cartitems.findIndex(
        (item) => item._id==action.payload._id
      );
      state.Cartitems[itemindex].cartQuantiy+=1;
      localStorage.setItem('Cartitems', JSON.stringify(state.Cartitems));
    },gettotal(state,action){
      let{total}=state.Cartitems.reduce((cartTotal,cartItem)=>{
        const {price,cartQuantiy} =cartItem;
        const itemtotal=price*cartQuantiy;
        cartTotal.total+=itemtotal
        return cartTotal;
      },{
        total:0,
      });
      state.CartTotalA=total;
    }
  },
});

export const {
  addToCart,
  removeFromcart,
  clearFromcart,
  login,
  logout,
  decreaseCart,
  inCart,
  gettotal 
} = cartSlice.actions;
export default cartSlice.reducer;
