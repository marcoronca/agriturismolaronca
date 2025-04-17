import { AppContents } from "@/model/contents";
import { PriceDate } from "@/model/prices";
import { Room } from "@/model/rooms";
import { Calendar } from "lucide-react";
import { Fragment } from "react";
import RoomStatus from "./ui/RoomStatus";

interface PriceTableSectionProps {
  rooms: Room[];
  contents: AppContents;
}

const PriceTableSection = ({ rooms, contents }: PriceTableSectionProps) => {
  const getSeason = (from: PriceDate, to: PriceDate) => {
    if (from.year !== to.year) {
      return `${from.year} - ${to.year}`;
    }
    return from.year;
  };

  return (
    <section className="bg-stone-200">
      <div className="mt-6 overflow-hidden border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>{contents.period}</th>
                  <th className="hidden sm:table-cell">
                    {contents.availability}
                  </th>
                  <th>{contents.price}</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <Fragment key={room.id}>
                    {room.prices?.length > 0 && (
                      <tr className="text-sm/6">
                        <th
                          scope="colgroup"
                          colSpan={3}
                          className="relative isolate py-2 font-semibold"
                        >
                          <h3>{room.name}</h3>
                          <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-stone-100 bg-stone-100" />
                          <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-stone-100 bg-stone-100" />
                        </th>
                      </tr>
                    )}
                    {room.prices.map((price) => (
                      <tr key={price.id}>
                        <td className="relative py-5 pr-6">
                          <div className="flex flex-col items-start justify-center gap-x-3">
                            <div className="text-sm/6 font-medium">
                              <Calendar className="mr-1 inline h-4 w-4" />
                              <span>
                                {price.from.dayMonth} - {price.to.dayMonth}
                              </span>
                            </div>
                            <div className="text-xs/snug font-medium">
                              {contents.season}:&nbsp;
                              {getSeason(price.from, price.to)}
                            </div>
                          </div>
                          <div className="absolute right-full bottom-0 h-px w-screen bg-stone-100" />
                          <div className="absolute bottom-0 left-0 h-px w-screen bg-stone-100" />
                        </td>
                        <td className="hidden py-5 pr-6 sm:table-cell">
                          <RoomStatus
                            contents={contents}
                            status={price.status}
                          />
                        </td>
                        <td className="py-5 text-right">
                          <div className="text-sm/6">€ {price.price}</div>
                          <div className="sm:hidden justify-end">
                            <RoomStatus
                              className="justify-end"
                              contents={contents}
                              status={price.status}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceTableSection;
