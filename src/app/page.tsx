"use client";

import { Loading } from "@/components/loading";
import { Table } from "@/components/table";
import { SpreadsheetService } from "@/services/spreadsheet";
import { TanstackService } from "@/services/tanstack";
import { RowType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ChangeEvent, useState } from "react";
import { WorkBook } from "xlsx";

export default function Home() {
  const [spreadsheet, setSpreadsheet] = useState<WorkBook | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [columns, setColumns] = useState<ColumnDef<RowType>[]>([]);
  const [data, setData] = useState<RowType[]>([]);
  const [filename, setFilename] = useState<string>("");

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsLoading(true);
      const file = e.target.files[0];
      const buffer = await file.arrayBuffer();
      const { spreadsheet, columns, data } = await SpreadsheetService.parse(
        buffer
      );
      const columnDefs: ColumnDef<RowType>[] =
        TanstackService.mapColumns(columns);
      setSpreadsheet(spreadsheet);
      setColumns(columnDefs);
      setData(data);
      setFilename(file.name);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header className="px-4 py-3 fixed flex justify-between items-center w-full">
            <label
              htmlFor="upload-button"
              className="bg-blue-500 p-2 inline-block rounded text-gray-100 w-32 text-center hover:bg-blue-400 transition-all cursor-pointer"
            >
              Upload
            </label>
            <input
              className="hidden"
              id="upload-button"
              type="file"
              accept=".xlsx"
              onChange={(e) => handleUpload(e)}
            />
            <span className="pl-4">{filename}</span>
          </header>
          <main className="pt-16 h-full">
            {spreadsheet && <Table columns={columns} data={data} />}
          </main>
        </>
      )}
    </>
  );
}
