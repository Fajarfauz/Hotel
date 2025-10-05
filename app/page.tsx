import Hero from "@/components/hero";
import Main from "@/components/main";
import { prisma } from "@/lib/prisma";
import { Room } from "@prisma/client";

export default async function Home() {
  const rooms: Room[] = await prisma.room.findMany();

  return (
    <div>
      <Hero rooms={rooms} />

      <div id="rooms" className="mt-16 scroll-mt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Room & Rates</h1>
          <p className="py-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda,
            reiciendis!
          </p>
        </div>
        <Main />
      </div>
    </div>
  );
}
