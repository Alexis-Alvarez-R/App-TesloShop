import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import type { Product } from "@/interface/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useAdminProducts = (id: string) => {
  const queryClient = useQueryClient();

  const queryProduct = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // const handleSubmitForm = async (productLike: Partial<Product>) => {
  //   console.log({ productLike });
  // };

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      //invalidar cache
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", { id: product.id }] });

      //actualizar queryData
      queryClient.setQueryData(["products", { id: product.id }], product);
    },
  });

  return {
    ...queryProduct,
    mutation,
  };
};
