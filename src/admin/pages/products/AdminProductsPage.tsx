import { AdminTittle } from "@/admin/components/AdminTittle";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

import { Link } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useProducts } from "@/shop/hooks/useProducts";
import { CustomFullscreenLoading } from "@/components/custom/CustomFullscreenLoading";
import { currencyFormatter } from "../../../lib/currency-formatter";

export const AdminProductsPage = () => {
  const { productsQuery } = useProducts();

  if (productsQuery.isLoading) {
    return <CustomFullscreenLoading></CustomFullscreenLoading>;
  }

  return (
    <>
      <div className="flex justify-between">
        <AdminTittle title="Productos" subtitle="Aqui puedes ver y administrar tus productos"></AdminTittle>

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon className="w-4 h-4"></PlusIcon>
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productsQuery.data?.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img src={product.images[0]} alt={product.title} className="w-20 h-20 object-cover rounded-md" />
              </TableCell>
              <TableCell>
                <Link to={`/admin/products/${product.id}`} className="hover:text-blue-500 hover:underline ">
                  {product.title}
                </Link>
              </TableCell>
              <TableCell>{currencyFormatter(product.price)}</TableCell>
              <TableCell>{product.gender}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.sizes.join(", ")}</TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/products/${product.id}`}>
                  <PencilIcon className="w-4 h-4 text-blue-500"></PencilIcon>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination totalPages={productsQuery.data?.pages ?? 0}></CustomPagination>
    </>
  );
};
