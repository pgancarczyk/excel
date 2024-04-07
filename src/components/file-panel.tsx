import { deleteUser, upsertUser } from "@/app/actions";
import { WorkBook } from "xlsx";
import { Button } from "./button";

export const FilePanel = ({
  email,
  filename,
  spreadsheet,
  isUploaded,
}: {
  email: string;
  filename: string;
  spreadsheet: WorkBook;
  isUploaded: boolean;
}) => {
  const save = async () => {
    const response = await upsertUser(email, filename, spreadsheet);
  };

  const remove = async () => {
    const response = await deleteUser(email);
  };

  const filepath = `/api/file/${email}`;

  return email ? (
    <div className="flex flex-row items-center gap-4 pr-4">
      <button
        className="bg-blue-500 p-2 inline-block rounded text-gray-100 w-48 text-center hover:bg-blue-400 transition-all cursor-pointer"
        onClick={() => save()}
      >
        save
      </button>
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
