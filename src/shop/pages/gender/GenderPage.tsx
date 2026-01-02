import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomHero } from "@/shop/components/CustomHero";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";
import { useParams } from "react-router";

export const GenderPage = () => {
  const { gender } = useParams();
  const { productsQuery } = useProducts();

  const genderLabel = gender === "men" ? "Hombres" : gender === "woman" ? "Mujeres" : "Ninos";
  return (
    <>
      <CustomHero title={`Productos para ${genderLabel}`}></CustomHero>
      <ProductsGrid products={productsQuery.data?.products ?? []}></ProductsGrid>
      <CustomPagination totalPages={productsQuery.data?.pages ?? 0}></CustomPagination>
    </>
  );
};
