import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ProductResponse } from "../models/ProductResponse";
import { BehaviorSubject, Observable } from "rxjs";
import { TokenStorageService } from "./TokenStorgeService.service";
import { WishListResponse } from "../models/WishListResponse";

@Injectable({
  providedIn: 'root'
})
export class GuestFavoriteService {
  private readonly FAVORITE_STORAGE_KEY = 'favorite_items';
  private favoriteSubjects: Map<number, BehaviorSubject<ProductResponse[]>> = new Map();
  isBrowser: boolean;

  constructor(
    private tokenStorage: TokenStorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.loadFavoritesFromStorage();
    }
  }

  getFavoriteObservableByBusinessId(businessId: number): Observable<ProductResponse[]> {
    if (!this.favoriteSubjects.has(businessId)) {
      const initialFavorites = this.getFavoriteItemsByBusinessId(businessId);
      const subject = new BehaviorSubject<ProductResponse[]>(initialFavorites);
      this.favoriteSubjects.set(businessId, subject);
    }
    return this.favoriteSubjects.get(businessId)!.asObservable();
  }

  addToFavorite(productResponse: any): void {
    if (this.isBrowser) {
      const businessId = this.tokenStorage.getBusinessID();
      if (!businessId) return;

      const businessFavorites = this.getBusinessFavoritesFromStorage();
      let favoriteItems = businessFavorites.get(+businessId) || [];

      const exists = favoriteItems.some(item => item.id === productResponse.productId || item.id === productResponse.id);
      if (exists) {
        return;
      }

      if (!productResponse.productName) {
        productResponse.productName = productResponse.name
      }
      favoriteItems.push(productResponse);
      businessFavorites.set(+businessId, favoriteItems);
      this.updateFavoritesInStorage(businessFavorites);

      const updatedFavorites = this.getFavoriteItemsByBusinessId(+businessId);
      if (updatedFavorites) {
        this.favoriteSubjects.get(+businessId)!.next(updatedFavorites);
      }
    }
  }

  removeFromFavorite(productId: number): void {
    if (this.isBrowser) {
      const businessId = this.tokenStorage.getBusinessID();
      if (!businessId) return;

      const businessFavorites = this.getBusinessFavoritesFromStorage();
      let favoriteItems = businessFavorites.get(+businessId) || [];

      favoriteItems = favoriteItems.filter(item => item.id !== productId);
      businessFavorites.set(+businessId, favoriteItems);
      this.updateFavoritesInStorage(businessFavorites);

      const updatedFavorites = this.getFavoriteItemsByBusinessId(+businessId);
      if (updatedFavorites) {
        this.favoriteSubjects.get(+businessId)!.next(updatedFavorites);
      }
    }
  }

  private loadFavoritesFromStorage(): void {
    if (this.isBrowser) {
      const favoriteItemsString = localStorage.getItem(this.FAVORITE_STORAGE_KEY);
      if (favoriteItemsString) {
        const favoritesMap: Map<number, ProductResponse[]> = new Map(JSON.parse(favoriteItemsString));
        for (const [businessId, favorites] of favoritesMap.entries()) {
          const subject = new BehaviorSubject<ProductResponse[]>(favorites);
          this.favoriteSubjects.set(businessId, subject);
        }
      }
    }
  }

  private updateFavoritesInStorage(favorites: Map<number, ProductResponse[]>): void {
    if (this.isBrowser) {
      localStorage.setItem(this.FAVORITE_STORAGE_KEY, JSON.stringify(Array.from(favorites.entries())));
    }
  }

  public getFavoriteItemsByBusinessId(businessId: number): ProductResponse[] {
    if (this.isBrowser) {
      const businessFavorites = this.getBusinessFavoritesFromStorage();
      return businessFavorites.get(businessId) || [];
    }
    return [];
  }

  private getBusinessFavoritesFromStorage(): Map<number, ProductResponse[]> {
    if (this.isBrowser) {
      const favoriteItemsString = localStorage.getItem(this.FAVORITE_STORAGE_KEY);
      if (!favoriteItemsString) {
        return new Map<number, ProductResponse[]>();
      }

      try {
        const favoritesMap: Map<number, ProductResponse[]> = new Map(JSON.parse(favoriteItemsString));
        return favoritesMap;
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        return new Map<number, ProductResponse[]>();
      }
    }
    return new Map<number, ProductResponse[]>();
  }

  isInFavorites(productId: number): boolean {
    if (this.isBrowser) {
      const businessId = this.tokenStorage.getBusinessID();
      if (!businessId) return false;

      const businessFavorites = this.getBusinessFavoritesFromStorage();
      const favoriteItems = businessFavorites.get(+businessId) || [];

      return favoriteItems.some(item => item.id === productId);
    }
    return false;
  }

  mapToWishListResponse(productResponse: ProductResponse): WishListResponse {
    const businessId = this.tokenStorage.getBusinessID();
    if (!businessId) {
      throw new Error("Business ID not found");
    }

    const wishListResponse = new WishListResponse();
    wishListResponse.businessId = +businessId;
    wishListResponse.itemId = productResponse.id;
    wishListResponse.productResponse = productResponse;
    return wishListResponse;
  }


}
