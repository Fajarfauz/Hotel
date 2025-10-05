"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { IoClose, IoMenu } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";

interface NavlinkProps {
  scrolled: boolean;
}

const Navlink = ({ scrolled }: NavlinkProps) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  // teks hitam saat scrolled, putih saat di top
  const baseText = scrolled ? "text-black hover:border-black" : "text-white hover:border-white";
  const linkStyle = `block py-2 px-3 ${baseText} hover:border-b-2 md:p-0 transition-colors`;

  return (
    <>
      {session?.user && (
        <div className="flex items-center justify-end md:order-2">
          <div className="hidden md:block">
            <Image
              className="rounded-full size-8"
              src={session.user.image || "/avatar.svg"}
              width={64}
              height={64}
              alt="avatar"
            />
          </div>
          <button
            onClick={() => signOut()}
            className={`hidden cursor-pointer md:block ml-2 py-2 px-4 ${baseText} hover:border-b-2 md:p-0 transition-colors`}
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Toggle mobile menu */}
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "inline-flex items-center p-2 justify-center text-sm rounded-md md:hidden transition-colors",
          scrolled ? "text-black" : "text-white"
        )}
      >
        {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
      </button>

      <div className={clsx("w-full md:block md:w-auto", { hidden: !open })}>
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0">
          {["Home", "About", "Room", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={linkStyle}
              >
                {item}
              </Link>
            </li>
          ))}

          {session && (
            <>
              <li>
                <Link href="/myreservation" className={linkStyle}>
                  My Reservation
                </Link>
              </li>
              {session.user.role === "admin" && (
                <>
                  <li>
                    <Link href="/admin/dashboard" className={linkStyle}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/room" className={linkStyle}>
                      Manage Room
                    </Link>
                  </li>
                </>
              )}
            </>
          )}

          {session ? (
            <li className="pt-2 md:pt-0 md:hidden ">
              <button
                onClick={() => signOut()}
                className={`py-2.5 px-4 ${baseText}`}
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li className="pt-2 md:pt-0">
              <Link href="/signin" className={`hidden cursor-pointer md:block ml-2 py-2 px-4 ${baseText} hover:border-b-2 md:p-0 transition-colors`}>
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navlink;
