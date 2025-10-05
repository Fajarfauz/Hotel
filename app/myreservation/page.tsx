import MyReserveList from "@/components/my-reserve-list";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getReservations } from "@/lib/data";
import HeaderSection from "@/components/header-section";

export const metadata: Metadata = {
  title: "MyReservation",
};

const MyReservationPage = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/sighin");

  const reservation = await getReservations();
  if (!reservation?.length) return <p>Reservation Not Found</p>;
  return (
    <div className="">
      <HeaderSection
        title="Your Reservation"
        subtitle="Lorem ipsum dolor sit amet."
        
      />
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-lg mx-auto py-10 px-4">
        <div className="flex items-center justify-between">
          <div className="">
            <h3 className="text-xl text-gray-800 mt-2">
              Hi, {session.user.name}{" "}
            </h3>
            <p className="mt-1 font-medium mb-4">
              Here&apos;s your book history :
            </p>
          </div>
        </div>
        <div className="rounded-sm">
          <MyReserveList />
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyReservationPage;
