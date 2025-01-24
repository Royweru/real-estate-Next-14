import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { serverUser } from "@/lib/serverUser";


export default async function Home() {
  const user = await serverUser()
  return (
   <>
    <Navbar user={user} />
    <Hero />
   </>
  );
}
