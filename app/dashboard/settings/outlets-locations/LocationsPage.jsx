"use client";
import Modal from "@/components/global/modal/Modal";
import { fetchApi } from "@/utils/FetchApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LocationsPage({ initialItems }) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showUpdateMenu, setShowUpdateMenu] = useState(false);
  const [items, setItems] = useState(initialItems || []);
  // const [city, setCity] = useState(initialItems || []);

  useEffect(() => {
    setItems(initialItems);
  }, []);

  const toggleAddMenu = () => {
    setShowAddMenu((prev) => !prev);
  };
  const handleErase = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item?.id !== id));
  };
  return (
    <main>
      <section className="w-full">
        <div className="flex flex-row justify-between item center mt-4">
          <h3 className="text-sm md:text-lg text-black font-extrabold  py-2">
            All Location
          </h3>
        </div>
        <div className="w-full mx-auto">
          <div className="flex justify-end items-center">
            <div className="flex items-center space-x-1">
              <button className="bg-gray-100 text-gray-500 px-4 py-2 lg:text-md rounded-md hover:bg-gray-200 hover:text-gray-600 w-auto flex md:ml-auto mt-2">
                Dhaka
                <svg
                  className="ml-3 mt-1 w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                    fill="gray"
                  />
                </svg>
              </button>

              <button
                onClick={() => setShowAddMenu(true)}
                className="text-white bg-black rounded-md px-4 py-2  w-auto flex md:ml-auto mt-2"
              >
                + Add Outlet
              </button>
            </div>
          </div>

          <hr className="my-4 border-gray-300" />
          <div div className="font-bold py-2 rounded">
            {" "}
            <h1 className="text-2xl font-semibold">Dhaka</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <svg
                className="absolute left-3 inset-y-0 my-auto h-5 w-5 text-primary"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="Interface / Search_Magnifying_Glass">
                    {" "}
                    <path
                      id="Vector"
                      d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
                      stroke="#F26522"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />{" "}
                  </g>{" "}
                </g>
              </svg>
              <input
                type="text"
                placeholder="Search for location"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-0"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Enter New location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-0"
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-primary"
                onClick={() => setShowAddMenu(true)}
              >
                ＋ Add New
              </button>
            </div>
          </div>

          <div className="">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center w-full px-2 py-2 border border-gray-300 rounded-md"
                >
                  <span className="">{item?.name}</span>
                  <div className="flex space-x-2">
                    <button
                      className="text-primary"
                      onClick={() => setShowUpdateMenu(true)}
                    >
                      <svg
                        fill="#F26522"
                        viewBox="0 0 528.899 528.899"
                        className="w-3 h-3"
                      >
                        <path
                          d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
                    c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611C532.495,100.753,532.495,77.559,518.113,63.177z
                    M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069L27.473,390.597L0.3,512.69z"
                        />
                      </svg>
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleErase(item?.id)}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g strokeWidth="0" />
                        <g strokeLinecap="round" strokeLinejoin="round" />
                        <g>
                          <path
                            d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                            fill="#F26522"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {items?.length <= 0 && (
              <div className="flex justify-center items-center font-semibold w-full h-full mx-auto my-10">
                No items found !
              </div>
            )}
          </div>
        </div>
      </section>

      <Modal addModal={() => setShowAddMenu(false)}>
        <div
          id="menu"
          className={`w-full h-full bg-gray-900 bg-opacity-80 top-0 right-0 ${
            showAddMenu ? "fixed" : "hidden"
          } sticky-0 z-30`}
        >
          <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-6 rounded-md shadow-md">
              <div className="flex justify-between items-center w-full">
                <span className="text-2xl font-bold">Add Outlet Location</span>
                <button
                  onClick={() => setShowAddMenu(false)}
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
              <form
                // onSubmit={handleAddProductGrid}
                className="w-full mt-6"
              >
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="gridName"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Product Grid Name
                    </label>
                    <input
                      type="text"
                      id="gridName"
                      name="gridName"
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="url"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Url
                    </label>
                    <input
                      type="text"
                      id="url"
                      name="url"
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
                        htmlFor="productRow"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Row
                      </label>
                      <input
                        type="number"
                        id="productRow"
                        name="productRow"
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="productColumn"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Column
                      </label>
                      <input
                        type="number"
                        id="productColumn"
                        name="productColumn"
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="filterCategory"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Filter Category
                      </label>
                      <div className="relative border border-gray-300 rounded-md">
                        {/* <select
                                                    // onChange={handleViewProducts}
                                                    id="filterCategory"
                                                    name="filterCategory"
                                                    required
                                                    className="w-full h-10 pl-3 pr-10 text-gray-600 bg-white rounded-md focus:outline-none"
                                                >
                                                    <option value="">Select Category</option>
                                                    {/* {AllCategories?.map((item) => ( */}
                        {/* <option key={item._id} value={item._id}>
                                                    {item.categoryName}
                                                </option> */}
                        {/* ))} */}
                        {/* </select>  */}
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
                          id="ordersBy"
                          name="ordersBy"
                          required
                          className="w-full h-10 pl-3 pr-10 text-gray-600 bg-white rounded-md focus:outline-none"
                        >
                          <option value="">Select Order</option>
                          {Array.from({ length: 9 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      </div>
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
                      <div className="mx-3 flex-grow mt-1">
                        {/* {gridProducts?.map((item) => ( */}
                        <div
                          className="bg-gray-100 rounded-md px-1 inline-block text-[12px] text-gray-600 mx-1"
                          // key={item._id}
                        >
                          {/* <span className="">{item._id}</span> */}
                          <button
                            onClick={() => handleRemoveProduct(item._id)}
                            className="hover:shadow-sm ml-2 font-semibold"
                          >
                            X
                          </button>
                        </div>
                        {/* ))} */}
                      </div>
                      <select
                        // onChange={handleGridProduct}
                        id="selectProduct"
                        name="selectProduct"
                        // disabled={
                        //     !filteredProducts || filteredProducts.length === 0
                        // }
                        // required
                        className="w-full h-10 pl-3 pr-10 text-gray-600 bg-white rounded-md focus:outline-none"
                      >
                        <option value="">Select Product</option>
                        {/* {filteredProducts?.map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.productName}
                                                    </option>
                                                ))} */}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label className="inline-flex items-center cursor-pointer gap-2">
                      Hide Out of Stock
                      <input
                        // onClick={handleHideOutOfStock}
                        type="checkbox"
                        name="hideOutOfStock"
                        id="hideOutOfStock"
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* {error && (
                                    <div className="text-red-500 text-sm mt-2">{error}</div>
                                )}
                                {message && (
                                    <div className="text-green-500 text-sm mt-2">{message}</div>
                                )} */}
                <button
                  type="submit"
                  className="py-2 px-4 mt-5 bg-black text-white rounded-md w-full"
                >
                  {/* {isLoading ? "Loading..." : "Submit"} */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <Modal updateModal={() => setShowUpdateMenu(false)}>
        <div
          id="update-menu"
          className={`w-full h-full bg-gray-900 bg-opacity-80 top-0 right-0 ${
            showUpdateMenu ? "fixed" : "hidden"
          } sticky-0 z-30`}
        >
          <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-6 rounded-md shadow-md">
              <div className="flex justify-between items-center w-full">
                <span className="text-2xl font-bold">
                  Update Outlet Location
                </span>
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
                      htmlFor="UpdateGridName"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Product Grid Name
                    </label>
                    <input
                      type="text"
                      id="UpdateGridName"
                      name="UpdateGridName"
                      // defaultValue={ }
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="updateUrl"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Url
                    </label>
                    <input
                      type="text"
                      id="updateUrl"
                      name="updateUrl"
                      // defaultValue={selectedItem?.url ?? ""}
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="UpdateProductGridDescription"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Product Grid Description
                    </label>
                    <input
                      type="text"
                      id="UpdateProductGridDescription"
                      name="UpdateProductGridDescription"
                      // defaultValue={selectedItem?.gridDescription}
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="UpdateProductRow"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Row
                      </label>
                      <input
                        type="number"
                        id="UpdateProductRow"
                        name="UpdateProductRow"
                        min={0}
                        // defaultValue={selectedItem?.productRow}
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="updateProductColumn"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Column
                      </label>
                      <input
                        type="number"
                        id="updateProductColumn"
                        name="updateProductColumn"
                        min={0}
                        // defaultValue={selectedItem?.productColumn}
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="filterCategory"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Filter Category
                      </label>
                      <div className="relative border border-gray-300 rounded-md">
                        <select
                          // onChange={handleViewProducts}
                          id="filterCategory"
                          name="filterCategory"
                          className="w-full h-10 pl-3 pr-10 text-gray-600 bg-white rounded-md focus:outline-none"
                        >
                          {/* <option value="">Select Category</option>
                                                    {AllCategories?.map((item) => (
                                                        <option key={item._id} value={item._id}>
                                                            {item.categoryName}
                                                        </option>
                                                    ))} */}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="UpdateOrderBy"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Order By
                      </label>
                      <div className="relative border border-gray-300 rounded-md">
                        <select
                          id="UpdateOrderBy"
                          name="UpdateOrderBy"
                          // value={selectedItem?.ordersBy?.toString() || ""}
                          // onChange={(e) => handleOrderByChange(e)}
                          required
                          className="w-full h-10 pl-3 pr-10 text-gray-600 bg-white rounded-md focus:outline-none"
                        >
                          {/* <option value="">Select Order</option>
                                                    {ordersByValues?.map((item) => (
                                                        <option key={item} value={item}>
                                                            {item}
                                                        </option>
                                                    ))} */}
                        </select>
                      </div>
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
                      <div className="mx-3 flex-grow mt-1">
                        {/* {updateItemData?.map((item) => ( */}
                        <div
                          className="bg-gray-100 rounded-md px-1 inline-block text-[12px] text-gray-600 mx-1"
                          // key={item._id}
                        >
                          {/* <span className="">{item._id}</span> */}
                          <button
                            onClick={() => handleRemoveUpdateProduct(item._id)}
                            className="hover:shadow-sm ml-2 font-semibold"
                          >
                            X
                          </button>
                        </div>
                        {/* ))} */}
                      </div>
                      <select
                        // onChange={handleUpdateSelectProduct}
                        id="selectProduct"
                        name="selectProduct"
                        // disabled={
                        //     !filteredProducts || filteredProducts.length === 0
                        // }
                        required
                        className="w-full h-10 pl-3 pr-10 text-gray-600 bg-white rounded-md focus:outline-none"
                      >
                        {/* <option value="">Select Product</option>
                                                {filteredProducts?.map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.productName}
                                                    </option>
                                                ))} */}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label className="inline-flex items-center cursor-pointer gap-2">
                      Hide Out of Stock
                      <input
                        // onClick={handleHideOutOfStock}
                        type="checkbox"
                        name="hideOutOfStock"
                        id="hideOutOfStock"
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* {error && (
                                    <div className="text-red-500 text-sm mt-2">{error}</div>
                                )}
                                {message && (
                                    <div className="text-green-500 text-sm mt-2">{message}</div>
                                )} */}
                <button
                  type="submit"
                  className="py-2 px-4 mt-5 bg-black text-white rounded-md w-full"
                >
                  {/* {isLoading ? "Loading..." : "Submit"} */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
