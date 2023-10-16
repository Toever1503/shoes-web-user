// stores/cart.js
import { defineStore } from 'pinia'


export interface ICartState {
    cart: ICart[]
}
export interface ICart {
    id: number;
    qty: number;
    anh: string;
    productId: number;
    productName: string;
    price: number;
    variation: string; // desribe variation
}
export const useCartStore = defineStore('cart', {
    state: (): ICartState => {
        let cart = [];
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        else {
            try {
                let cartLocalstorage = localStorage.getItem('cart');
                cart = cartLocalstorage ? JSON.parse(cartLocalstorage) : [];
            } catch (error) {
            }
        }
        return {
            cart
        }
    },
    actions: {
        addToCart(payload: ICart) {
            console.log("cart store-add: ", payload, this);
            if (localStorage.getItem("loggedUser"))
                addUpdateCartToDB(payload, this);
            else { }
            this.fAddToCart(payload);
        },
        fAddToCart(payload: ICart) {
            console.log("begin add item", payload);
            notification.success({
                message: "Thêm thành công!"
            })
            const cartItem = this.cart.find((item: ICart) => item.id === payload.id);
            if (cartItem) {
                this.cart.forEach((item: ICart) => {
                    if (item.id == cartItem.id)
                        item.qty = payload.qty + item.qty;
                });
            } else {
                this.cart.push({
                    id: payload.id,
                    qty: payload.qty,
                    anh: payload.anh,
                    productId: payload.productId,
                    productName: payload.productName,
                    price: payload.price,
                    variation: payload.variation,
                });
            };

            updateCartLocalstorage(this.cart)
        },
        updateCartQuantity(payload: ICart) {
            // if (localStorage.getItem("loggedUser"))
            //     addUpdateCartToDB(payload, this);
            // else
            this.fUpdateCartQuantity(payload);
        },
        fUpdateCartQuantity(payload: ICart) {
            this.cart = this.cart.map((item: ICart) => {
                if (item.id === payload.productId)
                    item.qty = payload.qty;
                return item;
            })
            updateCartLocalstorage(this.cart);
        },
        removeCartItem(variationId: number) {
            // if (localStorage.getItem("loggedUser"))
            //     CartService.removeProduct(payload.id)
            //         .then(() => { })
            //         .catch(err => {
            //             console.log("user.cart remove failed: ", err);
            //             alert("remove item failed!");
            //         });
            // else
            // context.commit('removeCartItem', payload)
            this.fRemoveCartItem(variationId);
        },
        fRemoveCartItem(variationId: number) {
            this.cart = this.cart.filter(item => item.id != variationId)
            updateCartLocalstorage(this.cart);
            notification.success({
                message: "Xoá thành công!"
            });
        }
        // forceResetCartItem: (context, payload) => {
        //     context.commit('forceResetCartItem', payload)
        // }
    },
    getters: {
        cartItems: (state) => {
            return state.cart
        },
        cartTotalQty(state) {
            return state.cart.reduce((total: number, product: { qty: number; }) => {
                return total + product.qty
            }, 0)
        },
        cartTotalAmount(state) {
            return state.cart.reduce((total: number, product: { price: number; qty: number; }) => {
                return total + (product.price * product.qty)
            }, 0)
        }
    }
})

const updateCartLocalstorage = (cart: ICart[]) => {
    // check logged user
    if (!localStorage.getItem('loggedUser'))
        localStorage.setItem('cart', JSON.stringify(cart));
};

const addUpdateCartToDB = (payload: any, context: any) => {
    // CartService.addProduct({
    //   sanPhamBienThe: payload.id,
    //   soLuong: payload.quantity
    // })
    //   .then(() => {
    //     context.fAddToCart(payload);
    //   })
    //   .catch(err => {
    //     console.log("user.add cart failed: ", err);
    //     alert("add item to cart failed!");
    //   });
};