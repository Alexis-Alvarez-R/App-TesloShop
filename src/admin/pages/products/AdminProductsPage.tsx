import { AdminTittle } from "@/admin/components/AdminTittle";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

import placeholderImg from "../../../assets/placeholder.svg";
import { Link } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const AdminProductsPage = () => {
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
            <TableHead className="w-[100px]">ID</TableHead>
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
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>
              <img src={placeholderImg} alt="img de producto" className="w-20 h-20 object-cover rounded-md" />
            </TableCell>
            <TableCell>kAKA</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>Categoria 1</TableCell>
            <TableCell>150</TableCell>
            <TableCell>XS, S, M, L , XL</TableCell>
            <TableCell className="text-right">
              <Link to={`/admin/products/t-shirt`}>Editar</Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <CustomPagination totalPages={5}></CustomPagination>
    </>
  );
};
