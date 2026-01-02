import { tesloShopApi } from "@/api/tesloShopApi";
import type { ProductsResponse } from "@/interface/products.response";

interface Options {
  limit?: number | string;
  offset?: number | string;
  gender?: string;
  sizes?: string;
  minPrice?: number;
  maxPrice?: number;
  query: string;
}

export const getProducts = async (options: Options): Promise<ProductsResponse> => {
  const { limit, offset, sizes, gender, minPrice, maxPrice, query } = options;
  const { data } = await tesloShopApi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
      q: query,
    },
  });

  const productsWithImg = data.products.map((product) => ({
    ...product,
    images: product.images.map((img) => `${import.meta.env.VITE_API_URL}/files/product/${img}`),
  }));

  return {
    ...data,
    products: productsWithImg,
  };
};
