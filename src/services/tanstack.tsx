import { RowType } from "@/types";
import { ColumnDef, CellContext } from "@tanstack/react-table";

export class TanstackService {
  static mapColumns = (columns: string[]): ColumnDef<RowType>[] =>
    columns.map((column) => ({
      header: column,
      accessorFn: (row) => row[column],
      cell: (props) => this.renderCell(props),
    }));

  private static renderCell = (props: CellContext<RowType, unknown>) => {
    const value = props.getValue() as RowType[keyof RowType];
    // props.cell.get
    return (
      <input
        type="text"
        className={`${
          typeof value === "number" && "text-right"
        } w-full outline-none p-1 hover:ring-2 focus:ring-2  transition-all focus:ring-blue-500 hover:ring-gray-500 `}
        defaultValue={value}
      />
    );
  };
}
