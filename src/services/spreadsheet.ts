import { RowType } from "@/types";
import { read, utils } from "xlsx";

export class SpreadsheetService {
  static parse = async (file: ArrayBuffer) => {
    const workbook = read(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = utils.sheet_to_json(worksheet);
    if (typeof json[0] !== "object" || typeof json[0] === null)
      throw Error("corrupted file");
    const data = json as RowType[];
    const columns = Object.keys(data[0]);
    return { spreadsheet: workbook, columns, data };
  };
}
