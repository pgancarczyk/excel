import { SortDirection } from "@tanstack/react-table";

export const Sort = ({ sorting }: { sorting: SortDirection | false }) => {
  switch (sorting) {
    case "asc":
      return <span className="text-blue-500">↓</span>;
    case "desc":
      return <span className="text-blue-500">↑</span>;
    default:
      return (
        <span className="text-gray-500 text-sm hover:text-blue-500">↓↑</span>
      );
  }
};
