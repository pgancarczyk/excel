"use client";

import { getUser } from "@/app/lib/actions";
import { Loading } from "@/components/loading";
import { Table } from "@/components/table";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { read, utils, WorkBook } from "xlsx";
import { UserPanel } from "./user-panel";
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getColumns, getData } from "@/app/lib/tanstack";

export default function Home() {
  const [spreadsheet, setSpreadsheet] = useState<WorkBook>(utils.book_new());
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [filename, setFilename] = useState<string>("");
  const [isUplaoded, setIsUplaoded] = useState<boolean>(false);
  const data = useMemo(() => getData(spreadsheet), [spreadsheet]);
  const columns = useMemo(() => getColumns(data), [data]);
  const { data: session } = useSession();

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
    meta: { spreadsheet },
  });

  useEffect(() => {
    const email = session?.user?.email;
    if (email) {
      getUser(email).then((user) => {
        if (user) {
          setFilename(user.filename);
          setIsUplaoded(true);
          fetch(`/api/file/${email}`).then((response) => {
            if (response.status === 200) {
              response.arrayBuffer().then((buffer) => {
                const spreadsheet = read(buffer);
                setSpreadsheet(spreadsheet);
              });
            }
          });
        } else setIsUplaoded(false);
      });
    }
  }, [session]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsLoading(true);
      const file = e.target.files[0];
      const buffer = await file.arrayBuffer();
      const spreadsheet = read(buffer);
      setSpreadsheet(spreadsheet);
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
            <div>
              <label
                title={
                  isUplaoded && session
                    ? "delete the current file if you want to upload a new one"
                    : ""
                }
                htmlFor={isUplaoded ? "" : "upload-button"}
                className={`${
                  isUplaoded && session
                    ? "bg-gray-500"
                    : "bg-blue-500 hover:bg-blue-400 cursor-pointer"
                } p-2 inline-block rounded text-gray-100 w-32 text-center transition-all`}
              >
                upload
              </label>
              <input
                className="hidden"
                id="upload-button"
                type="file"
                accept=".xlsx"
                onChange={(e) => handleUpload(e)}
              />
              <span className="pl-4">{filename}</span>
            </div>
            <UserPanel />
          </header>
          <main className="pt-16 h-full">
            {table && (
              <Table
                table={table}
                filename={filename}
                email={session?.user?.email || ""}
                isUploaded={isUplaoded}
                readSpreadsheet={setSpreadsheet}
              />
            )}
          </main>
        </>
      )}
    </>
  );
}
