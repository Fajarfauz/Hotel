"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import { Room } from "@prisma/client";
import {
  IoBedOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoMoonOutline,
} from "react-icons/io5";

interface HeroProps {
  rooms: Room[];
}

const Hero = ({ rooms }: HeroProps) => {
  const slides = [
    {
      src: "/hotel3.png",
      title: "Luxury Suite",
      desc: "Kenyamanan mewah untuk liburan Anda",
    },
    {
      src: "/slide2.jpg",
      title: "Ocean View",
      desc: "Pemandangan laut yang menenangkan",
    },
    {
      src: "/slide5.jpg",
      title: "Family Room",
      desc: "Ruang luas dan nyaman untuk keluarga",
    },
    {
      src: "/slide1.jpg",
      title: "Romantic Getaway",
      desc: "Suasana romantis untuk pasangan",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setActiveIndex((p) => (p + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  // === Form state ===
  const [roomType, setRoomType] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;

  const handleSearch = () => {
    if (!roomType) return alert("Pilih jenis kamar");
    if (!checkIn || !checkOut)
      return alert("Pilih tanggal check-in dan check-out");

    const target = document.getElementById("rooms");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Slide */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <Image
            key={i}
            src={s.src}
            alt="background"
            fill
            priority={i === activeIndex}
            className={`object-cover absolute inset-0 transition-opacity duration-1000 ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Slide title/desc */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 text-right max-w-xl z-10 drop-shadow-lg">
        <h2 className="text-5xl font-bold mb-1">{slides[activeIndex].title}</h2>
        <p className="text-lg text-gray-200">{slides[activeIndex].desc}</p>
      </div>

      {/* === Form === */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-6xl font-extrabold mb-3 mt-8">
              Book your Luxury Room
            </h1>
            <p className="text-lg text-gray-200 mb-3">
              Get Special offer just for you today.
            </p>
          </div>

          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md space-y-5">
            {/* Jenis Room */}
            <div>
              <label className="font-semibold flex items-center gap-2">
                <IoBedOutline className="text-orange-400" />
                Room Type
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full border border-gray-400 p-2 rounded mt-1"
              >
                <option value="">-- Pilih Room --</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date pickers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold flex items-center gap-2 mb-1">
                  <IoCalendarOutline className="text-orange-400" />
                  Check-in
                </label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => {
                    setCheckIn(date);
                    if (checkOut && date && date >= checkOut) setCheckOut(null);
                  }}
                  minDate={new Date()}
                  placeholderText="Pilih tanggal"
                  dateFormat="dd-MM-yyyy"
                  className="w-full border border-gray-400 p-2 rounded"
                />
              </div>
              <div>
                <label className="text-sm font-semibold flex items-center gap-2 mb-1">
                  <IoCalendarOutline className="text-orange-400" />
                  Check-out
                </label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  minDate={checkIn || new Date()}
                  placeholderText="Pilih tanggal"
                  dateFormat="dd-MM-yyyy"
                  className="w-full border border-gray-400 p-2 rounded"
                />
              </div>
            </div>

            {/* Duration */}
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              Duration :
              <span className="flex items-center gap-1">
                <span className="text-orange-400">{nights}</span> Night
                <IoMoonOutline className="text-orange-400 ml-1" />
              </span>
            </p>

            {/* Guests */}
            <div>
              <label className="font-semibold flex items-center gap-2">
                <IoPeopleOutline className="text-orange-400" />
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full border border-gray-400 p-2 rounded mt-1"
              >
                {[1, 2, 3].map((g) => (
                  <option key={g} value={g}>
                    {g} Orang
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="bg-orange-400 text-white rounded-md font-semibold py-3 px-6 hover:bg-orange-500 w-full transition-transform active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`mb-5 relative w-35 aspect-[3/6] rounded-md overflow-hidden border transition-all duration-700 ${
              i === activeIndex
                ? "scale-105"
                : "border-none bg-black/50 backdrop-blur-sm opacity-50 scale-95"
            }`}
          >
            <Image
              src={s.src}
              alt={`thumb-${i}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
