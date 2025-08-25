import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TokenStorageService } from "./TokenStorgeService.service";
import { MatDialog } from "@angular/material/dialog";
import { NotifacationMessageComponent } from "../notifacation-message/notifacation-message.component";
import { ShoppingCartResponse } from "../models/ShoppingCartResponse";
import { CartItemResponse } from "../models/CartItemResponse";

@Injectable({
  providedIn: 'root'
})
export class GuestShoppingCartService {
  private readonly CART_STORAGE_KEY = 'shopping_cart';
  public cartSubject: BehaviorSubject<ShoppingCartResponse> = new BehaviorSubject(new ShoppingCartResponse());

  QUANTITY_EXCEEDS: string = 'QUANTITY_EXCEEDS';
  isBrowser: boolean;

  constructor(
    private tokenStorage: TokenStorageService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const initialCart = this.getCartItemsByBusinessId(Number(this.tokenStorage.getBusinessID()));
      if (initialCart) {
        this.cartSubject.next(initialCart);
      }
    }
  }

  addItemToCart(cartItem: CartItemResponse, quantity: number): void {
    if (this.isBrowser) {
      let cart = this.getCartFromStorage() || new Map<number, ShoppingCartResponse>();
      const businessId = this.tokenStorage.getBusinessID();
      if (!businessId) return;
      let cartForBusiness = cart.get(+businessId);
      if (!cartForBusiness) {
        cartForBusiness = new ShoppingCartResponse();
        cart.set(+businessId, cartForBusiness);
      }

      const existingCartItem = cartForBusiness.cartItemResponseList.find(item => item.productId === cartItem.productId && item.skuId === cartItem.skuId)
      if (existingCartItem) {
        const newQuantity = cartItem.quantity + quantity;
        if (newQuantity > cartItem.availableQuantity) {
          this.showErrorNotification(this.QUANTITY_EXCEEDS);
          return;
        }
        existingCartItem.quantity = newQuantity;
        if (existingCartItem.cacheQuantity <= 0) {
          cartForBusiness.cartItemResponseList = cartForBusiness.cartItemResponseList.filter(item => item.productId !== cartItem.productId || item.skuId !== cartItem.skuId);
        }
      } else {
        cartItem.quantity = quantity
        cartForBusiness.cartItemResponseList.push(cartItem);
      }

      this.updateCartStorage(cart);
      this.cartSubject.next(cartForBusiness);
    }
  }

  emptyCart(): void {
    if (this.isBrowser) {
      let cart = this.getCartFromStorage();
      if (!cart) return;
      const businessId = this.tokenStorage.getBusinessID();
      if (!businessId) return;
      let cartForBusiness = cart.get(+businessId);
      if (!cartForBusiness) return;
      cartForBusiness.cartItemResponseList.forEach(i => {
        this.removeItemFromCart(i.productId, i.skuId)
      })
      cartForBusiness = cart.get(+businessId);
      if (!cartForBusiness) return;
      cart.delete(+businessId);
      this.updateCartStorage(cart);
      cartForBusiness.cartItemResponseList = [];
      this.cartSubject.next(cartForBusiness);
      window.location.reload()
    }
  }

  removeItemFromCart(productId: number, skuId: number | null): void {
    if (this.isBrowser) {
      let cart = this.getCartFromStorage();
      if (!cart) return;
      const businessId = this.tokenStorage.getBusinessID();
      if (!businessId) return;
      let cartForBusiness = cart.get(+businessId);
      if (!cartForBusiness) return;
      cartForBusiness.cartItemResponseList = cartForBusiness.cartItemResponseList.filter(item => productId && (item.id != productId || item.productId != productId) || skuId && item.skuId != skuId);
      this.updateCartStorage(cart);
      this.cartSubject.next(cartForBusiness);
    }
  }

  private getCartFromStorage(): Map<number, ShoppingCartResponse> | null {
    if (this.isBrowser) {
      const cartString = localStorage.getItem(this.CART_STORAGE_KEY);
      return cartString ? new Map(JSON.parse(cartString)) : null;
    }
    return null;
  }

  private updateCartStorage(cart: Map<number, ShoppingCartResponse>): void {
    if (this.isBrowser) {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify([...cart]));
    }
  }

  showErrorNotification(message: string): void {
    this.dialog.open(NotifacationMessageComponent, {
      backdropClass: 'notificationmodal-popup',
      width: '450px',
      data: { title: 'ERROR', message: message }
    });
  }

  getCartItemsByBusinessId(businessId: number): any {
    if (this.isBrowser) {
      if (!!businessId) {
        let cart = this.getCartFromStorage() || new Map<number, ShoppingCartResponse>();
        let cartForBusiness = cart.get(+businessId);
        if (!cartForBusiness) {
          cartForBusiness = new ShoppingCartResponse();
          cart.set(+businessId, cartForBusiness);
        }
        return cartForBusiness;
      }
    }
    return null;
  }

  getCartItemsByBusinessIdForShoppingPage(businessId: number): ShoppingCartResponse | null {
    if (this.isBrowser) {
      const cart = this.getCartItemsByBusinessId(businessId) as ShoppingCartResponse;
      if (!cart) return null;
      cart.cartItemResponseList.forEach(cartItem => {
        if (cartItem.productResponse) {
          const mainAttributeDtos = cartItem.productResponse.mainAttributeDtos;
          const flattenedVariants = mainAttributeDtos.flatMap(variant => variant.productVarientDTOs);
          const p = flattenedVariants.find(s => s.skuId === cartItem.skuId)
          cartItem.availableQuantity = cartItem.productResponse.quantity;
          cartItem.promotionItem = p?.discountPrice !== null
          let t = cartItem.quantity
          cartItem.quantity = cartItem.cacheQuantity
          cartItem.cacheQuantity = t
        }
      });
      return cart;
    }
    return null;
  }

}
