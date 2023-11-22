// stores/cart.js
import { defineStore } from 'pinia'
import CartService from '~/services/CartService';


export interface ICartState {
    cart: ICart[],
    variationNow?: ICart
}
export interface ICart {
    id: number;
    qty: number;
    anh: string;
    productId: number;
    productName: string;
    price: number;
    variation: string; // desribe variation
    stockCnt: number;
    isTurnOffShowRs?: boolean;
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
            this.fAddToCart(payload);
        },
        async fAddToCart(payload: ICart) {
            console.log("begin add item", payload);

            try {
                if (localStorage.getItem('loggedUser'))
                    await CartService.addProduct({
                        sanPhamBienThe: payload.id,
                        soLuong: payload.qty
                    });

                if (!payload.isTurnOffShowRs)
                    notification.success({
                        message: "Thêm thành công!"
                    });

                const cartItem = this.cart.find((item: ICart) => item.id === payload.id);
                if (cartItem) {
                    {
                        if (cartItem.qty == payload.stockCnt) return;
                        this.cart.forEach((item: ICart) => {
                            if (item.id == cartItem.id)
                                item.qty = payload.qty + item.qty;
                        });
                    }
                } else {
                    this.cart.push({
                        id: payload.id,
                        qty: payload.qty,
                        anh: payload.anh,
                        productId: payload.productId,
                        productName: payload.productName,
                        price: payload.price,
                        variation: payload.variation,
                        stockCnt: payload.stockCnt,
                    });
                };

                updateCartLocalstorage(this.cart)
            }
            catch (err) {
                console.log("user.add cart failed: ", err);
                notification.error({
                    message: "Thêm sản phẩm thất bại!"
                });
            }
        },
        async updateCartQuantity(payload: ICart) {
            try {
                if (localStorage.getItem("loggedUser"))
                    await CartService.addProduct({
                        sanPhamBienThe: payload.id,
                        soLuong: payload.qty
                    });
                this.fUpdateCartQuantity(payload);
            }
            catch (err) {
                console.log("user.add cart failed: ", err);
                notification.error({
                    message: "Không thể cập nhật giỏ hàng!"
                });
            }
        },
        fUpdateCartQuantity(payload: ICart) {
            const newCart = this.cart.map((item: ICart) => {
                if (item.id == payload.id)
                    item.qty = payload.qty;
                return item;
            });
            this.cart = newCart;

            updateCartLocalstorage(newCart);
        },
        async removeCartItem(variationId: number) {
            try {
                if (localStorage.getItem("loggedUser"))
                    await CartService.removeProduct(variationId);
                this.fRemoveCartItem(variationId);
            }
            catch (err) {
                console.log("failed to remove cart item", err);
            }
        },
        fRemoveCartItem(variationId: number) {
            this.cart = this.cart.filter(item => item.id != variationId)
            updateCartLocalstorage(this.cart);
            notification.success({
                message: "Xoá thành công!"
            });
        },
        fSetCart(cartItems: ICart[]) {
            this.cart = cartItems;
            localStorage.setItem('cart', JSON.stringify([]));
        },
        fSetBuyNow(item: ICart) {
            this.variationNow = item;
        }
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

// sync cart
export const syncCart = () => {
    const _storeCart = useCartStore();

    console.log("sync cart begin", _storeCart)

    let cart: ICart[];
    // sync new user
    if (localStorage.getItem('cart') && localStorage.getItem('loggedUser')) {
        let cartLocalstorage = localStorage.getItem('cart');
        cart = cartLocalstorage ? JSON.parse(cartLocalstorage) : [];
        CartService.syncCart(cart.map(item => ({
            sanPhamBienThe: item.id,
            soLuong: item.qty
        })))
            .then((res) => {
                _storeCart.fSetCart(res as ICart[]);
                console.log("data cart: ", res);
                localStorage.removeItem("cart");
            });
        console.log("cart local: ", cart)
    }
    else if (localStorage.getItem('loggedUser')) {
        CartService.myCart()
            .then(res => {
                _storeCart.fSetCart(res as ICart[]);
                console.log("my cart: ", res);
            })

    }
    // sync old user
}
