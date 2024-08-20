"use client";
import Modal from "@/components/global/modal/Modal";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchApi } from "@/utils/FetchApi";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EventsPage({ initialItems }) {
  const [items, setItems] = useState([]);
  const [showUpdateMenu, setShowUpdateMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const AllCategories = categories?.categories?.categories;

  useEffect(() => {
    const storedItems = localStorage.getItem("itemsOrder");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      const initialOrderedItems = initialItems.map((item, index) => ({
        ...item,
        eventCatId: index,
      }));
      localStorage.setItem("itemsOrder", JSON.stringify(initialOrderedItems));
      setItems(initialOrderedItems);
    }
  }, [initialItems]);

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragEnter = (index) => {
    if (draggedItem === null) return;

    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(draggedItem, 1);
    newItems.splice(index, 0, movedItem);

    updateItemsOrder(newItems);
    setDraggedItem(index);
    setItems(newItems);
  };

  const handleDragEnd = async () => {
    setDraggedItem(null);

    try {
      const updatePromises = items.map((item) => {
        const data = {
          eventId: item._id,
          catEventId: item.eventCatId,
        };
        return fetchApi("/event/updateCatEventId", "PATCH", data);
      });

      await Promise.all(updatePromises);
      localStorage.setItem("itemsOrder", JSON.stringify(items));
      setMessage("Items order updated successfully");
    } catch (error) {
      console.error("Failed to update events order in the database", error);
      setError("Failed to update events order. Please try again.");
    }
  };

  const updateItemsOrder = (items) => {
    items.forEach((item, index) => {
      item.eventCatId = index; // Update eventCatId to reflect the new order
    });
  };

  // Sort items based on eventCatId
  const sortedItems = [...items].sort((a, b) => a.eventCatId - b.eventCatId);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  }


  return (
    <main>
      <section className="w-full">
        <div className="flex flex-row justify-between item center mt-4">
          <h3 className="text-lg text-black font-extrabold px-5 py-2">All Product Grids</h3>
          <Link
            href="/dashboard/settings/events/addevent"
            className="text-sm text-white bg-black rounded-md px-5 py-2 w-36 flex ml-auto mt-2"
          >
            Add New Event
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 m-5 w-full">
            {/* {sortedItems?.map((item, index) => ( */}
            <div
              // key={item._id}
              // draggable
              // onDragStart={() => handleDragStart(index)}
              // onDragEnter={() => handleDragEnter(index)}
              // onDragEnd={handleDragEnd}
              // className={`w-full h-24 bg-slate-50 flex items-center justify-center mx-auto cursor-move rounded-md shadow-md transition-transform duration-700 ease-in-out hover:bg-slate-100 ${draggedItem === index ? "scale-[1.02]" : ""
              // }`}
              className={`w-full h-auto bg-slate-50 flex items-center justify-center mx-auto cursor-move rounded-md shadow-md transition-transform duration-700 ease-in-out hover:bg-slate-100 "scale-[1.02]" : ""
                  `}
              style={{
                transition: "transform 0.3s ease-in-out",
              }}
            ><div className="flex flex-col w-full gap-5">
                <div className="flex justify-between items-center gap-x-2 w-full px-5 mt-5">
                  <div className="text-sm text-white bg-black rounded-full px-2">2 x 3</div>
                  <div className="flex flex-row gap-x-2">
                    <svg className="cursor-pointer" onClick={() => setShowUpdateMenu(true)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                    </svg>

                    <svg className="cursor-pointer" onClick={() => setShowUpdateMenu(true)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#FF3B30" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="#FF3B30" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M9.5 16.5V10.5" stroke="#FF3B30" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M14.5 16.5V10.5" stroke="#FF3B30" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-x-2 w-full px-5 mb-2">
                  <div className="flex flex-row justify-between items-center">
                    <div>
                      <h4 className="text-[#202435] text-md md:text-xl font-semibold uppercase">
                        NEW COLLECTION OF INVERTER AC
                      </h4>
                      <h4 className="text-[#9B9BB4] text-xs md:text-sm font-semibold">
                        Efficient Cooling, Endless Comfort: Your Ultimate Solution for Year-Round Temperature Control
                      </h4>
                    </div>

                    <div className="flex justify-center ml-auto" onClick={toggleCollapse}>
                      <svg
                        width="26" height="14" viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className={`cursor-pointer transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <path d="M1 0.5L13 12.5L25 0.5" stroke="black" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`mt-2 overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'h-auto' : 'h-0'
                      }`}
                  >
                    <div className="p-4 bg-slate-50 hover:bg-white rounded-lg">

                      <div className="flex flex-row justify-center">

                        <div
                          className={`w-full min-h-full overflow-hidden border shadow-sm hover:shadow-lg duration-700 rounded-md p-5 mx-auto relative`}
                        >
                          <div className="relative group duration-700">
                            {/* {product?.general?.salePrice ? ( */}
                            <div className="absolute top-0 left-0 bg-[#F16521] rounded-full text-white z-5">
                              <p className="text-sm px-3 py-1">
                                {/* {(
                                  ((product?.general?.regularPrice -
                                    product?.general?.salePrice) /
                                    product?.general?.regularPrice) *
                                  100
                                ).toFixed(1)} */}
                                5%
                              </p>
                            </div>
                            {/* ) : ( */}
                            <></>
                            {/* )} */}
                            <Link href="">
                              <div className="object-cover min-h-[200px] flex justify-center overflow-hidden">
                                {/* <Image
                                src=""
                                width={200}
                                height={200}
                                alt="product"
                                className="hover:scale-105 duration-700"
                              /> */}
                              </div>
                            </Link>
                            <div className="mt-5 flex justify-start items-center">
                              <p class="text-[#70BE38] text-xs font-semibold border border-[#70BE38] rounded-md px-3 py-1">In Stock</p>
                              <span class="text-[#F16521] text-xs font-semibold ml-3 px-3 py-1 border border-[#F16521] rounded-md">Online &amp; Offline</span>
                            </div>
                            <div className="mt-3">
                              <Link href="">
                                <h4 className="text-[#202435] hover:text-[#F16521] duration-700 text-md font-semibold h-14">
                                  {/* {product?.productName} */}
                                  Hitachi
                                </h4>
                              </Link>
                              <div className="mt-5 text-slate-500 text-md">
                                <div className=" ">
                                  Offer Price:{" "}
                                  <span className="font-semibold ml-1">
                                    ৳450
                                  </span>{" "}
                                </div>
                                <div className="">
                                  M.R.P:
                                  <del className="ml-1">৳450</del>
                                </div>
                                <div className="flex justify-start items-center">
                                  Your Save:
                                  <div className="ml-1 flex justify-start items-center">
                                    {/* {product?.general?.salePrice ? ( */}
                                    <p className="font-semibold">
                                      {/* {(
                                            ((product?.general?.regularPrice -
                                              product?.general?.salePrice) /
                                              product?.general?.regularPrice) *
                                            100
                                          ).toFixed(1)} */}
                                      450 %
                                    </p>
                                    {/* ) : ( */}
                                    <></>
                                    {/* )} */}
                                    <p>
                                      {/* ( */}

                                      {/* {product?.general?.regularPrice - product?.general?.salePrice} */}
                                      {/* ) */}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-5 flex justify-start items-center">
                                <p
                                // className={`${
                                //   product?.inventory?.stockStatus === "In Stock"
                                //     ? "text-[#70BE38]"
                                //     : "text-red-400"
                                // } text-xs font-semibold ${
                                //   product?.inventory?.stockStatus === "In Stock"
                                //     ? "border border-[#70BE38]"
                                //     : "border border-red-400 bg-red-100"
                                // } rounded-md px-3 py-1`}
                                >
                                  {/* {product?.inventory?.stockStatus} */}
                                </p>
                                {/* <span className="text-[#F16521] text-xs font-semibold ml-3 px-3 py-1 border border-[#F16521] rounded-md">
                                          {product?.inventory?.inventoryStatus}
                                        </span> */}
                              </div>

                            </div>
                          </div>
                        </div>


                        <div
                          className={`w-full min-h-full overflow-hidden border shadow-sm hover:shadow-lg duration-700 rounded-md p-5 mx-auto relative`}
                        >
                          <div className="relative group duration-700">
                            {/* {product?.general?.salePrice ? ( */}
                            <div className="absolute top-0 left-0 bg-[#F16521] rounded-full text-white z-5">
                              <p className="text-sm px-3 py-1">
                                {/* {(
                                  ((product?.general?.regularPrice -
                                    product?.general?.salePrice) /
                                    product?.general?.regularPrice) *
                                  100
                                ).toFixed(1)} */}
                                5%
                              </p>
                            </div>
                            {/* ) : ( */}
                            <></>
                            {/* )} */}
                            <Link href="">
                              <div className="object-cover min-h-[200px] flex justify-center overflow-hidden">
                                {/* <Image
                                src=""
                                width={200}
                                height={200}
                                alt="product"
                                className="hover:scale-105 duration-700"
                              /> */}
                              </div>
                            </Link>
                            <div className="mt-5 flex justify-start items-center">
                              <p class="text-[#70BE38] text-xs font-semibold border border-[#70BE38] rounded-md px-3 py-1">In Stock</p>
                              <span class="text-[#F16521] text-xs font-semibold ml-3 px-3 py-1 border border-[#F16521] rounded-md">Online &amp; Offline</span>
                            </div>
                            <div className="mt-3">
                              <Link href="">
                                <h4 className="text-[#202435] hover:text-[#F16521] duration-700 text-md font-semibold h-14">
                                  {/* {product?.productName} */}
                                  Hitachi
                                </h4>
                              </Link>
                              <div className="mt-5 text-slate-500 text-md">
                                <div className=" ">
                                  Offer Price:{" "}
                                  <span className="font-semibold ml-1">
                                    ৳450
                                  </span>{" "}
                                </div>
                                <div className="">
                                  M.R.P:
                                  <del className="ml-1">৳450</del>
                                </div>
                                <div className="flex justify-start items-center">
                                  Your Save:
                                  <div className="ml-1 flex justify-start items-center">
                                    {/* {product?.general?.salePrice ? ( */}
                                    <p className="font-semibold">
                                      {/* {(
                                            ((product?.general?.regularPrice -
                                              product?.general?.salePrice) /
                                              product?.general?.regularPrice) *
                                            100
                                          ).toFixed(1)} */}
                                      450 %
                                    </p>
                                    {/* ) : ( */}
                                    <></>
                                    {/* )} */}
                                    <p>
                                      {/* ( */}

                                      {/* {product?.general?.regularPrice - product?.general?.salePrice} */}
                                      {/* ) */}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-5 flex justify-start items-center">
                                <p
                                // className={`${
                                //   product?.inventory?.stockStatus === "In Stock"
                                //     ? "text-[#70BE38]"
                                //     : "text-red-400"
                                // } text-xs font-semibold ${
                                //   product?.inventory?.stockStatus === "In Stock"
                                //     ? "border border-[#70BE38]"
                                //     : "border border-red-400 bg-red-100"
                                // } rounded-md px-3 py-1`}
                                >
                                  {/* {product?.inventory?.stockStatus} */}
                                </p>
                                {/* <span className="text-[#F16521] text-xs font-semibold ml-3 px-3 py-1 border border-[#F16521] rounded-md">
                                          {product?.inventory?.inventoryStatus}
                                        </span> */}
                              </div>

                            </div>
                          </div>
                        </div>


                        <div
                          className={`w-full min-h-full overflow-hidden border shadow-sm hover:shadow-lg duration-700 rounded-md p-5 mx-auto relative`}
                        >
                          <div className="relative group duration-700">
                            {/* {product?.general?.salePrice ? ( */}
                            <div className="absolute top-0 left-0 bg-[#F16521] rounded-full text-white z-5">
                              <p className="text-sm px-3 py-1">
                                {/* {(
                                  ((product?.general?.regularPrice -
                                    product?.general?.salePrice) /
                                    product?.general?.regularPrice) *
                                  100
                                ).toFixed(1)} */}
                                5%
                              </p>
                            </div>
                            {/* ) : ( */}
                            <></>
                            {/* )} */}
                            <Link href="">
                              <div className="object-cover min-h-[200px] flex justify-center overflow-hidden">
                                {/* <Image
                                src=""
                                width={200}
                                height={200}
                                alt="product"
                                className="hover:scale-105 duration-700"
                              /> */}
                              </div>
                            </Link>
                            <div className="mt-5 flex justify-start items-center">
                              <p class="text-[#70BE38] text-xs font-semibold border border-[#70BE38] rounded-md px-3 py-1">In Stock</p>
                              <span class="text-[#F16521] text-xs font-semibold ml-3 px-3 py-1 border border-[#F16521] rounded-md">Online &amp; Offline</span>
                            </div>
                            <div className="mt-3">
                              <Link href="">
                                <h4 className="text-[#202435] hover:text-[#F16521] duration-700 text-md font-semibold h-14">
                                  {/* {product?.productName} */}
                                  Hitachi
                                </h4>
                              </Link>
                              <div className="mt-5 text-slate-500 text-md">
                                <div className=" ">
                                  Offer Price:{" "}
                                  <span className="font-semibold ml-1">
                                    ৳450
                                  </span>{" "}
                                </div>
                                <div className="">
                                  M.R.P:
                                  <del className="ml-1">৳450</del>
                                </div>
                                <div className="flex justify-start items-center">
                                  Your Save:
                                  <div className="ml-1 flex justify-start items-center">
                                    {/* {product?.general?.salePrice ? ( */}
                                    <p className="font-semibold">
                                      {/* {(
                                            ((product?.general?.regularPrice -
                                              product?.general?.salePrice) /
                                              product?.general?.regularPrice) *
                                            100
                                          ).toFixed(1)} */}
                                      450 %
                                    </p>
                                    {/* ) : ( */}
                                    <></>
                                    {/* )} */}
                                    <p>
                                      {/* ( */}

                                      {/* {product?.general?.regularPrice - product?.general?.salePrice} */}
                                      {/* ) */}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-5 flex justify-start items-center">
                                <p
                                // className={`${
                                //   product?.inventory?.stockStatus === "In Stock"
                                //     ? "text-[#70BE38]"
                                //     : "text-red-400"
                                // } text-xs font-semibold ${
                                //   product?.inventory?.stockStatus === "In Stock"
                                //     ? "border border-[#70BE38]"
                                //     : "border border-red-400 bg-red-100"
                                // } rounded-md px-3 py-1`}
                                >
                                  {/* {product?.inventory?.stockStatus} */}
                                </p>
                                {/* <span className="text-[#F16521] text-xs font-semibold ml-3 px-3 py-1 border border-[#F16521] rounded-md">
                                          {product?.inventory?.inventoryStatus}
                                        </span> */}
                              </div>

                            </div>
                          </div>
                        </div>



                      </div>





                      {/* <p>
                        This is the content that will be collapsed or expanded. You can add
                        anything you want here, like text, images, or other components.
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col gap-5 m-5 w-full">
            {sortedItems?.map((item, index) => (
              <div
                key={item._id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                className={`w-full h-24 bg-slate-50 flex items-center justify-center mx-auto cursor-move rounded-md shadow-md transition-transform duration-700 ease-in-out hover:bg-slate-100 ${draggedItem === index ? "scale-[1.02]" : ""
                  }`}
                style={{
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <div className="flex justify-between items-center gap-x-2 w-full px-5">
                  <div onClick={() => setShowUpdateMenu(true)}>
                    <h4 className="text-[#202435] text-md md:text-xl font-semibold uppercase">
                      {item?.title}
                    </h4>
                    <h4 className="text-[#9B9BB4] text-xs md:text-sm font-semibold">
                      {item?.description}
                    </h4>
                  </div>
                  <div className="flex justify-center ml-auto">
                    <button
                      href={item?.url}
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
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal closeModal={() => setShowUpdateMenu(false)}>
        <div
          id="menu"
          className={`fixed inset-0 bg-gray-900 bg-opacity-80 z-50 ${showUpdateMenu ? "block" : "hidden"}`}
        >
          <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-6 rounded-md shadow-md">
              <div className="flex justify-between items-center w-full">
                <span className="text-2xl font-bold">Edit Product Grids</span>
                <button
                  onClick={() => setShowUpdateMenu(false)}
                  className="text-gray-400 focus:outline-none"
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
              <form className="w-full mt-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="Product"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Product
                    </label>
                    <input
                      type="text"
                      id="Product"
                      name="Product"
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="productGridDescription"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Product Grid Description
                    </label>
                    <input
                      type="text"
                      id="productGridDescription"
                      name="productGridDescription"
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="row"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Row
                      </label>
                      <input
                        type="number"
                        id="row"
                        name="row"
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="column"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Column
                      </label>
                      <input
                        type="number"
                        id="column"
                        name="column"
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="filterCategory"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Filter Category
                    </label>
                    <div className="relative border border-gray-300 rounded-md">
                      <select
                        id="filterCategory"
                        name="filterCategory"
                        required
                        className="w-full h-10 pl-3 pr-10 text-gray-600 bg-white rounded-md focus:outline-none"
                      >
                        <option value="">Select Event Category</option>
                        {AllCategories?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="selectProduct"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Select Product
                    </label>
                    <div className="relative border border-gray-300 rounded-md">
                      <select
                        id="selectProduct"
                        name="selectProduct"
                        required
                        className="w-full h-10 pl-3 pr-10 text-gray-600 bg-white rounded-md focus:outline-none"
                      >
                        <option value="">Select Event Category</option>
                        {AllCategories?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="orderBy"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Order By
                    </label>
                    <div className="relative border border-gray-300 rounded-md">
                      <select
                        id="orderBy"
                        name="orderBy"
                        required
                        className="w-full h-10 pl-3 pr-10 text-gray-600 bg-white rounded-md focus:outline-none"
                      >
                        <option value="">Select Event Category</option>
                        {AllCategories?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label className="inline-flex items-center cursor-pointer gap-2">
                      Hide Out of Stock
                      <input type="checkbox" class="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                    </label>
                  </div>
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
                  {isLoading ? "Loading..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
