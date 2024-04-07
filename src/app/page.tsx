import Home from "@/components/home";
import SessionProvider from "@/components/session";

export default async function Page() {
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  );
}
