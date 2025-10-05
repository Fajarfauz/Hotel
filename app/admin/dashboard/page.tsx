import DashboardCards from "@/components/admin/dashboard-cards";
import { Metadata } from "next";
import ReservationList from "@/components/admin/reservation-list";
import { Suspense } from "react";
import HeaderSection from "@/components/header-section";

export const metadata: Metadata = {
  title: "Dahboard",
};

const DashboardPage = () => {
  return (
    <div className="">
      <HeaderSection
        title="Dashboard"
        subtitle="Lorem ipsum dolor sit amet."
      />
      <div className="max-w-screen-xl px-4 mx-auto my-5 pb-5">
        <h1 className="text-4xl font-bold text-gray-800 pb-2">Dashboard</h1>
        <Suspense fallback={<p>Loading Card...</p>}>
          <DashboardCards />
        </Suspense>
        <Suspense fallback={<p>Loading Reservation...</p>}>
          <ReservationList />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
