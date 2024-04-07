import { RowType } from "@/types";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getPaginationRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";
import { Sort } from "./sort";
import { Filter } from "./filter";
import { Pagination } from "./pagination";
import { FilePanel } from "./file-panel";
import { WorkBook } from "xlsx";

export const Table = ({
  columns,
  data,
  filename,
  email,
  spreadsheet,
  isUploaded,
}: {
  columns: ColumnDef<RowType>[];
  data: RowType[];
  filename: string;
  email: string;
  spreadsheet: WorkBook;
  isUploaded: boolean;
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    initialState: { pagination: { pageSize: 50 } },
  });
  return (
    <>
      <table className="flex flex-col h-full overflow-y-hidden w-max">
        <thead className="ml-[-1px]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-solid border-2 p-1 border-gray-500 sticky w-48 top-0 z-10"
                >
                  <span
                    className="pr-2 cursor-pointer"
                    onClick={() => header.column.toggleSorting()}
                  >
                    <Sort sorting={header.column.getIsSorted()} />
                  </span>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <span
                    onClick={() => header.column.setFilterValue("")}
                    className={`pl-2 ${
                      header.column.getIsFiltered()
                        ? "text-blue-500 cursor-pointer"
                        : "text-gray-500"
                    }`}
                  >
                    ▼
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="flex flex-auto h-full flex-col overflow-y-scroll overflow-x-auto">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-solid border-1 w-48 border-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="mb-14">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-t-gray-500 border-t-2 sticky bottom-0 w-48"
                >
                  <Filter column={header.column} table={table} />
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="fixed bottom-0 z-20 flex flex-row items-center gap-4 pb-2 w-full justify-between">
        <Pagination table={table} />
        <FilePanel
          filename={filename}
          email={email}
          spreadsheet={spreadsheet}
          isUploaded={isUploaded}
        />
      </div>
    </>
  );
};
