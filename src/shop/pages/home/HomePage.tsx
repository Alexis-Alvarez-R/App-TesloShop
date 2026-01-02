import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomHero } from "@/shop/components/CustomHero";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";

export const HomePage = () => {
  const { productsQuery } = useProducts();
  return (
    <>
      <CustomHero title="Todos los Productos"></CustomHero>
      <ProductsGrid products={productsQuery.data?.products ?? []}></ProductsGrid>
      <CustomPagination totalPages={productsQuery.data?.pages ?? 0}></CustomPagination>
    </>
  );
};
