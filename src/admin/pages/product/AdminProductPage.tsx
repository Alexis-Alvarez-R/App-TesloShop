import { Navigate, useNavigate, useParams } from "react-router";

import { useAdminProducts } from "@/admin/hooks/useAdminProducts";
import { CustomFullscreenLoading } from "@/components/custom/CustomFullscreenLoading";
import { AdminProductForm } from "./ui/AdminProductForm";
import type { Product } from "@/interface/product.interface";
import { toast } from "sonner";

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError, mutation } = useAdminProducts(id || "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subTitle = id === "new" ? "Aquí puedes crear un nuevo producto." : "Aquí puedes editar el producto.";

  const handleSubmitForm = async (productLike: Partial<Product> & { files?: File[] }) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success("Producto actualizado correctamente", {
          position: "top-right",
        });
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error al actualizar el producto", {
          position: "top-right",
        });
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/products"></Navigate>;
  }

  if (isLoading) {
    return <CustomFullscreenLoading></CustomFullscreenLoading>;
  }

  if (!product) {
    return <Navigate to="/admin/products"></Navigate>;
  }

  return (
    <AdminProductForm
      title={title}
      subTitle={subTitle}
      product={product}
      isPending={mutation.isPending}
      onSubmit={handleSubmitForm}
    ></AdminProductForm>
  );
};
