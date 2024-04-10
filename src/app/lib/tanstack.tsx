import { ColumnDef, CellContext, RowData, Table } from "@tanstack/react-table";
import { useState } from "react";
import { utils, WorkBook } from "xlsx";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    spreadsheet: WorkBook;
  }
}

export type RowType = {
  [key: string]: string | number;
};

export type SpreadsheetTable = Table<RowType>;

export const getData = (spreadsheet: WorkBook) => {
  if (!spreadsheet.SheetNames.length) return [];
  const worksheet = spreadsheet.Sheets[spreadsheet.SheetNames[0]];
  const json = utils.sheet_to_json(worksheet);

  if (typeof json[0] !== "object" || typeof json[0] === null)
    throw Error("corrupted file");

  return json as RowType[];
};

export const getColumns = (data: RowType[]): ColumnDef<RowType>[] => {
  if (data.length === 0) return [];
  const names = Object.keys(data[0]);
  return names.map((name, index) => ({
    header: name,
    accessorFn: (row) => row[name],
    cell: (props) => <RenderCell props={props} column={index} />,
  }));
};

export const RenderCell = ({
  props,
  column,
}: {
  props: CellContext<RowType, unknown>;
  column: number;
}) => {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const value = props.getValue() as RowType[keyof RowType];
  const row = props.row.index + 2;
  const origin = `${utils.encode_col(column)}${row}`;

  const edit = (newValue: string | number) => {
    setIsDirty(newValue !== value);
    if (props.table.options.meta) {
      const { spreadsheet } = props.table.options.meta;
      utils.sheet_add_aoa(
        spreadsheet.Sheets[spreadsheet.SheetNames[0]],
        [[newValue]],
        {
          origin,
        }
      );
    }
  };

  return (
    <input
      type={`${typeof value === "number" ? "number" : "text"}`}
      className={`${typeof value === "number" && "text-right"} ${
        isDirty ? "bg-blue-100" : ""
      } w-full outline-none p-1 hover:ring-2 focus:ring-2  transition-all focus:ring-blue-500 hover:ring-gray-500 `}
      defaultValue={value}
      onChange={(e) =>
        edit(
          typeof value === "number"
            ? parseFloat(e.target.value)
            : e.target.value
        )
      }
    />
  );
};
