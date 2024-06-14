import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableColumn, AdminTableProps } from "@/types";

const AdminTable = ({ data, columns, count }: AdminTableProps) => {
  const renderTableCell = (item: any, column: TableColumn) => {
    if (typeof column.accessor === "function") {
      return column.accessor(item);
    }
    const value = column.accessor.split(".").reduce((o, k) => (o || {})[k], item);
    return value;
  };

  return (
    <Table className="p-5 dark:text-gray-100 text-gray-700">
      <TableHeader>
        <TableRow>
          {columns.map((column, idx) => (
            <TableHead key={idx}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => (
          <TableRow key={idx}>
            {columns.map((column, colIdx) => (
              <TableCell key={colIdx}>{renderTableCell(item, column)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminTable;
