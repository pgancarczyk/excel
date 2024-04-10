import { RowType } from "@/app/lib/tanstack";
import { Table } from "@tanstack/react-table";

export const Pagination = ({ table }: { table: Table<RowType> }) => (
  <>
    <div className="flex items-center gap-2 pl-2">
      <button
        className="border rounded p-1"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </button>
      <span className="flex items-center gap-1">
        <div>page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount().toLocaleString()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className=" p-1 rounded outline-none w-16"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className="outline-none p-1 rounded"
      >
        {[20, 50, 100, 200].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            show {pageSize}
          </option>
        ))}
      </select>
      showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
      {table.getRowCount().toLocaleString()} rows
    </div>
  </>
);
