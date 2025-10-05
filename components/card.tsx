import { formatCurrency } from "@/lib/utils";
import { Room } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { IoPeopleCircleOutline } from "react-icons/io5";

const Card = ({ room }: { room: Room }) => {
  return (
    <div className="bg-white shadow-lg rounded-sm transition duration-100 hover:shadow-sm">
      <div className="h-[120px] w-auto rounded-t-sm relative">
        <Image
          src={room.image}
          width={300}
          height={200}
          alt="room image"
          className="w-full h-full object-cover rounded-t-sm"
        />
      </div>
      <div className="p-5 px-8">
        <h4 className="font-medium text-2xl">
          <Link
            href={`/room/${room.id}`}
            className="hover:text-gray-800 transition duration-150"
          >
            {room.name}
          </Link>
        </h4>
        <h4 className="mb-7">
          <span className="font-semibold text-gray-600">
            {formatCurrency(room.price)}
          </span>
          <span className="text-gray-400 text-sm">/Night</span>
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IoPeopleCircleOutline />
            <span>
              {room.capacity} {room.capacity === 1 ? "person" : "people"}
            </span>
          </div>
          <Link
            href={`/room/${room.id}`}
            className="px-6 py-2.5 md:px-4 md:py-2 font-semibold text-white bg-orange-400 rounded-sm hover:bg-orange-500 transition duration-150"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
