import { deleteUser, upsertUser } from "@/app/lib/actions";
import { WorkBook } from "xlsx";
import { Button } from "./button";
import { SpreadsheetTable } from "@/app/lib/tanstack";
import { Dispatch, SetStateAction } from "react";

export const FilePanel = ({
  email,
  filename,
  table,
  isUploaded,
  readSpreadsheet,
}: {
  email: string;
  filename: string;
  table: SpreadsheetTable;
  isUploaded: boolean;
  readSpreadsheet: (spreadsheet: WorkBook) => void;
}) => {
  const save = async () => {
    if (table.options.meta) {
      const { spreadsheet } = table.options.meta;
      await upsertUser(email, filename, spreadsheet);
      readSpreadsheet(spreadsheet);
    }
  };

  const remove = async () => {
    await deleteUser(email);
  };

  const filepath = `/api/file/${email}`;

  return email ? (
    <div className="flex flex-row items-center gap-4 pr-4">
      <Button disabled={!filename} onClick={() => save()}>
        save
      </Button>
      <Button
        disabled={!isUploaded}
        onClick={() => remove()}
        title={`${
          !isUploaded ? "file is currently not saved in the database" : ""
        }`}
      >
        delete
      </Button>
      <a href={isUploaded ? filepath : ""} download={filename}>
        <Button
          disabled={!isUploaded}
          title={`${
            !isUploaded ? "file is currently not saved in the database" : ""
          }`}
        >
          download
        </Button>
      </a>
    </div>
  ) : (
    <div />
  );
};
