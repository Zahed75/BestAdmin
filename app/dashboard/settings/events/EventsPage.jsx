"use client";
import Modal from "@/components/global/modal/Modal";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function EventsPage({ initialItems }) {
  const [items, setItems] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showUpdateMenu, setShowUpdateMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedItems = localStorage.getItem("itemsOrder");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      setItems(initialItems);
    }
  }, []);

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
    localStorage.setItem("itemsOrder", JSON.stringify(items));
  };

  console.log(items);

  return (
    <main>
      <section className="w-full">
        <button
          type="button"
          onClick={() => setShowMenu(true)}
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
                className={`w-full h-24 bg-slate-50 flex items-center justify-center mx-auto cursor-move rounded-md shadow-md transition-transform duration-700 ease-in-out hover:bg-slate-100 ${
                  draggedItem === index ? "scale-[1.02]" : ""
                }`}
                style={{
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <div className="flex justify-between items-center gap-x-2 w-full px-5">
                  <div onClick={() => setShowUpdateMenu(true)}>
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
      {/* modal */}
      <Modal closeModal={() => setShowMenu(false)}>
        <div
          id="menu"
          className={`w-full h-full bg-gray-900 bg-opacity-80 top-0 right-0 ${
            showMenu ? "fixed" : "hidden"
          } sticky-0`}
        >
          <div className="2xl:container h-screen 2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
            <div className="max-w-[565px] lg:min-w-[565px] md:w-auto relative flex flex-col justify-center items-center bg-white p-4 rounded-md">
              <div className="flex justify-between items-center w-full">
                <span className="text-3xl font-bold">Add Events</span>
                <button
                  onClick={() => setShowMenu(false)}
                  className="text-gray-400  focus:outline-none"
                  aria-label="close"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <form
                // onSubmit={handleSubmit}
                className="w-full mt-10"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="eventName"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Event Name
                    </label>
                    <input
                      type="text"
                      id="eventName"
                      name="eventName"
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-noneF"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="eventUrl"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Url
                    </label>
                    <input
                      type="text"
                      id="eventUrl"
                      name="eventUrl"
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-none "
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="eventCategory"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Event Categories
                  </label>
                  <br />
                  <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                    <select
                      id="eventCategory"
                      name="eventCategory"
                      required
                      className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                    >
                      <option value="">Select Event Category</option>
                      {/* {AllCategories?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.categoryName}
                        </option>
                      ))} */}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 w-full mt-5">
                  <label
                    htmlFor="eventDescription"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="eventDescription"
                    name="eventDescription"
                    cols={30}
                    rows={3}
                    required
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
                {message && (
                  <div className="text-green-500 text-sm mt-2">{message}</div>
                )}

                <button
                  type="submit"
                  className="py-2 px-4 mt-5 bg-black text-white rounded-md w-full"
                >
                  {isLoading ? "Loading..." : "Add Category"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {/* update modal */}
      <Modal closeModal={() => setShowUpdateMenu(false)}>
        <div
          id="menu"
          className={`w-full h-full bg-gray-900 bg-opacity-80 top-0 right-0 ${
            showUpdateMenu ? "fixed" : "hidden"
          } sticky-0`}
        >
          <div className="2xl:container h-screen 2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
            <div className="max-w-[565px] lg:min-w-[565px] md:w-auto relative flex flex-col justify-center items-center bg-white p-4 rounded-md">
              <div className="flex justify-between items-center w-full">
                <span className="text-3xl font-bold">Update Events</span>
                <button
                  onClick={() => setShowUpdateMenu(false)}
                  className="text-gray-400  focus:outline-none"
                  aria-label="close"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <form
                // onSubmit={handleSubmit}
                className="w-full mt-10"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="eventName"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Event Name
                    </label>
                    <input
                      type="text"
                      id="eventName"
                      name="eventName"
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-noneF"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="eventUrl"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Url
                    </label>
                    <input
                      type="text"
                      id="eventUrl"
                      name="eventUrl"
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-none "
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="eventCategory"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Event Categories
                  </label>
                  <br />
                  <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                    <select
                      id="eventCategory"
                      name="eventCategory"
                      required
                      className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                    >
                      <option value="">Select Event Category</option>
                      {/* {AllCategories?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.categoryName}
                        </option>
                      ))} */}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 w-full mt-5">
                  <label
                    htmlFor="eventDescription"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="eventDescription"
                    name="eventDescription"
                    cols={30}
                    rows={3}
                    required
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
                {message && (
                  <div className="text-green-500 text-sm mt-2">{message}</div>
                )}
                <button
                  type="submit"
                  className="py-2 px-4 mt-5 bg-black text-white rounded-md w-full"
                >
                  {isLoading ? "Loading..." : "Update Category"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
