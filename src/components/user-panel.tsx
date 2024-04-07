import { signIn, signOut, useSession } from "next-auth/react";

export const UserPanel = () => {
  const { data } = useSession();

  return data ? (
    <div className="flex flex-row items-center gap-4">
      <p>logged in as {data.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="bg-blue-500 p-2 inline-block rounded text-gray-100 w-48 text-center hover:bg-blue-400 transition-all cursor-pointer"
      >
        log out
      </button>
    </div>
  ) : (
    <button
      onClick={() => signIn()}
      className="bg-blue-500 p-2 inline-block rounded text-gray-100 w-48 text-center hover:bg-blue-400 transition-all cursor-pointer"
    >
      log in
    </button>
  );
};
