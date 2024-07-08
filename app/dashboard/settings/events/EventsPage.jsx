"use client";
import Link from "next/link";
import { useState } from "react";

export default function EventsPage() {
  const [items, setItems] = useState([
    {
      id: "1",
      title: "New Arrival: Hisense Inverter Ac",
      description:
        "Do not miss our best selling products from Washing Machine category.",
      url: "#",
    },
    {
      id: "2",
      title: "New collection of inverter ac",
      description: "Efficient Cooling, Endless Comfort: Your Ultimate Solution",
      url: "#",
    },
    {
      id: "3",
      title: "Top Selling Washers",
      description:
        "Do not miss our best selling products from Washing Machine category.",
      url: "#",
    },
    {
      id: "4",
      title: "New arrival this week ",
      description: "Fresh picks: Discover Our Latest Additions!",
      url: "#",
    },
    {
      id: "5",
      title: "Full Range of whirlpool refrigerators",
      description: "Only at Best Electronics",
      url: "#",
    },
  ]);

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragEnter = (index) => {
    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(draggedItem, 1);
    newItems.splice(index, 0, movedItem);

    setDraggedItem(index);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <main>
      <section className="w-full">
        <button
          type="button"
          className="text-sm text-white bg-black rounded-md px-5 py-2 flex ml-auto"
        >
          Add New Event
        </button>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 m-5 w-full">
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                className={`w-full h-24 bg-slate-50 flex items-center justify-center mx-auto cursor-move rounded-md shadow-md transition-transform duration-300 ease-in-out hover:bg-slate-100 ${
                  draggedItem === index ? "scale-[1.02]" : ""
                }`}
                style={{
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <div className="flex justify-between items-center gap-x-2 w-full px-5">
                  <div>
                    <h4 className="text-[#202435] text-md md:text-xl font-semibold uppercase">
                      {item.title}
                    </h4>
                    <h4 className="text-[#9B9BB4] text-xs md:text-sm font-semibold">
                      {item.description}
                    </h4>
                  </div>
                  <div className="flex justify-center ml-auto">
                    <Link
                      href="/dashboard/settings/events"
                      className="border border-gray-400 text-gray-400 text-nowrap text-xs md:text-sm font-semibold py-2 px-4 rounded-full flex items-center justify-center"
                    >
                      View All
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2"
                      >
                        <g clipPath="url(#clip0_705_5009)">
                          <path
                            d="M14.8858 7.57988L11.8108 4.53488C11.7008 4.42488 11.5633 4.36988 11.3983 4.36988C11.2333 4.36988 11.0958 4.42738 10.9858 4.54238C10.8758 4.65738 10.8208 4.79488 10.8208 4.95488C10.8208 5.11488 10.8758 5.25488 10.9858 5.37488L13.0408 7.41488H0.635781C0.475781 7.41488 0.338281 7.47238 0.223281 7.58738C0.108281 7.70238 0.0507812 7.83988 0.0507812 7.99988C0.0507812 8.15988 0.108281 8.29738 0.223281 8.41238C0.338281 8.52738 0.475781 8.58488 0.635781 8.58488H13.0408L10.9858 10.6249C10.8758 10.7449 10.8208 10.8849 10.8208 11.0449C10.8208 11.2049 10.8758 11.3424 10.9858 11.4574C11.0958 11.5724 11.2333 11.6299 11.3983 11.6299C11.5633 11.6299 11.7008 11.5749 11.8108 11.4649L14.8858 8.41988C14.9958 8.29988 15.0508 8.15988 15.0508 7.99988C15.0508 7.83988 14.9958 7.69988 14.8858 7.57988Z"
                            fill="gray"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_705_5009">
                            <rect
                              width="15"
                              height="15"
                              fill="gray"
                              transform="matrix(1 0 0 -1 0 15.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
