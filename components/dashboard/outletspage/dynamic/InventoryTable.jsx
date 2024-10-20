"use client";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Image from "next/image";
import Modal from "@/components/global/modal/Modal";

export default function InventoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5); // data per page
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const noPicture = "https://i.ibb.co/sqPhfrt/notimgpng.png";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchQuery, setSearchQuery] = useState("");



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const data = [
    {
      id: 1,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-695",
      price: "1586",
      published: "18 may 2024",
      stockQuantity: 10,
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 2,
      productName: "Sharp Washing machine",
      sku: "FAN-CON-1542",
      price: "985",
      published: "18 may 2024",
      stockQuantity: 15,
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 3,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-8457",
      price: "4895",
      published: "18 may 2024",
      stockQuantity: 10,
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 4,
      productName: "Conion LED Tv 33 inch",
      sku: "FAN-CON-1542",
      price: "6951",
      published: "22 jan 2024",
      stockQuantity: 0,
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 5,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-1542",
      price: "1586",
      published: "18 may 2024",
      stockQuantity: 0,
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 6,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-0184",
      price: "1586",
      published: "18 may 2024",
      stockQuantity: 10,
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 7,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "985",
      published: "18 may 2024",
      stockQuantity: 10,
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 8,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "4895",
      published: "18 may 2024",
      stockQuantity: 20,
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 9,
      productName: "Conion LED Tv 33 inch",
      sku: "FAN-CON-1542",
      price: "6951",
      published: "22 jan 2024",
      stockQuantity: 10,
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 10,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-1542",
      price: "1586",
      published: "18 may 2024",
      stockQuantity: 10,
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 11,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-1542",
      price: "1586",
      published: "18 may 2024",
      stockQuantity: 10,
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 12,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "985",
      published: "18 may 2024",
      stockQuantity: 10,
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 13,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "4895",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 14,
      productName: "Conion LED Tv 33 inch",
      sku: "FAN-CON-1542",
      price: "6951",
      published: "22 jan 2024",
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 15,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-1542",
      price: "1586",
      published: "18 may 2024",
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
    {
      id: 16,
      productName: "HItaci Ac 2 Ton",
      sku: "FAN-CON-1542",
      price: "1586",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 17,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "985",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 18,
      productName: "LG LED Tv 40 inch",
      sku: "FAN-CON-1542",
      price: "4895",
      published: "18 may 2024",
      stock: "In Stock",
      bg: "bg-green-100",
      text: "text-green-400",
    },
    {
      id: 19,
      productName: "Conion LED Tv 33 inch",
      sku: "FAN-CON-1542",
      price: "6951",
      published: "22 jan 2024",
      stock: "Out of Stock",
      bg: "bg-red-100",
      text: "text-red-400",
    },
  ];

  useEffect(() => {
    if (selectedItem) {
      console.log("Updated selectedItem:", selectedItem); // Log when selectedItem changes
    }
  }, [selectedItem]);

  const selectItem = (item) => {
    setSelectedItem(item);
    console.log("Item clicked:", selectedItem);
    setIsOpen(false);
  };

  const filteredData = data?.filter((item) =>
    Object.values(item).some(
      (value) =>
        value != null &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sorting function
  const sortedData = filteredData.sort((a, b) => {
    if (!sortBy) return 0;
    if (sortDirection === "asc") {
      return a[sortBy].localeCompare(b[sortBy]);
    } else {
      return b[sortBy].localeCompare(a[sortBy]);
    }
  });

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = sortedData.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const firstItemIndex = (currentPage - 1) * dataPerPage + 1;
  const lastItemIndex = Math.min(currentPage * dataPerPage, data.length);
  const totalItems = data.length;

  const showingText = `Showing ${firstItemIndex}-${lastItemIndex} of ${totalItems}`;

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : [...data.map((item) => item.id)]);
  };

  const handleSelectItem = (itemId) => {
    const selectedIndex = selectedItems.indexOf(itemId);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems([
        ...selectedItems.slice(0, selectedIndex),
        ...selectedItems.slice(selectedIndex + 1),
      ]);
    }
  };

  return (
    <section className="w-full my-5">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-y-3 mt-5 border-b-2 pb-5">
        <div className="flex justify-between md:justify-start items-center w-full">
          <h5 className="text-lg md:text-2xl font-bold">Inventory</h5>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 ml-auto w-full md:col-span-2">
          {/* search bar */}
          <div className="relative flex items-center w-full py-2 rounded-lg focus-within:shadow-lg bg-[#F9FAFB] shadow-md overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="peer h-full w-full outline-none text-sm text-gray-500 bg-[#F9FAFB] pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>

          <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md">
            <select className="bg-[#F9FAFB] mx-3 p-2 outline-none">
              <option className="bg-[#F9FAFB]" value="30">
                Filter with
              </option>
              <option className="bg-[#F9FAFB]" value="15">
                Outlets Name
              </option>
              <option className="bg-[#F9FAFB]" value="7">
                Outlets City
              </option>
              <option className="bg-[#F9FAFB]" value="1">
                Outlets Address
              </option>
            </select>
          </div>
          <div className="ml-auto md:ml-0 text-white border border-black bg-black rounded-lg shadow-md">
            <button
              onClick={() => setShowAddMenu(true)}
              className="flex justify-center items-center px-2 py-1"
            >
              <span className="text-xl font-semibold mr-1">+</span>{" "}
              <span className="text-nowrap">Add Inventory</span>
            </button>
          </div>
        </div>
      </div>
      {/* table component*/}
      <div className="w-full mx-auto my-5">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full table-fixed dark:divide-gray-700">
                  {/* table head */}
                  <thead className="bg-gray-100 ">
                    <tr>
                      <th scope="col" className="p-4 w-6">
                        <div className="flex items-center">
                          <input
                            id="checkbox_all"
                            type="checkbox"
                            className="w-4 h-4 bg-gray-100 rounded border-gray-300 "
                            onChange={handleSelectAll}
                            checked={selectAll}
                          />
                          <label htmlFor="checkbox-all" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("productName")}
                        className="py-3 text-[12px] lg:text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Product name &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("sku")}
                        className="px-8 lg:px-0 py-3  text-[12px] lg:text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        SKU &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("price")}
                        className="px-8 lg:px-0 py-3  text-[12px] lg:text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer text-nowrap"
                      >
                        Price &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("published")}
                        className="px-8 lg:px-0 py-3 text-[12px] lg:text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer text-nowrap"
                      >
                        Published &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("stock")}
                        className="px-8 lg:px-0 py-3  text-[12px] lg:text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Stock &#x21d5;
                      </th>
                      <th
                        scope="col"
                        className="px-8 lg:px-0 py-3  text-[12px] lg:text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-black">
                    {currentData?.map((item) => (
                      <tr
                        key={item.id}
                        className={`${item.id % 2 !== 0 ? "" : "bg-gray-100"
                          } hover:bg-gray-100 duration-700`}
                      >
                        <td scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              id={`checkbox_${item.id}`}
                              type="checkbox"
                              className="w-4 h-4  bg-gray-100 rounded border-gray-300"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleSelectItem(item.id)}
                            />
                            <label
                              htmlFor={`checkbox_${item.id}`}
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 text-wrap md:whitespace-nowrap">
                          <Link href={`/dashboard/outlets/${item.id}`}>
                            <div className="flex justify-start items-center">
                              <Image
                                width={30}
                                height={30}
                                className="w-7 h-7 rounded-md"
                                src="https://i.ibb.co/jVPhV6Q/diego-gonzalez-I8l-Durtf-Ao-unsplash.jpg"
                                alt=""
                              />
                              <span className="ml-2">{item.productName}</span>
                            </div>
                          </Link>
                        </td>
                        <td className="pl-10 lg:px-0 py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {item.sku}
                        </td>
                        <td className="px-6 lg:px-0 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          <span className="text-md">৳</span>
                          {item.price}
                        </td>
                        <td className="px-6 lg:px-0 py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {item.published}
                        </td>
                        <td className="px-6 lg:px-0 py-4 text-sm font-medium text-center whitespace-nowrap ">
                          {/* <span
                            className={`${item.bg} ${item.text} px-2 py-1 rounded-full`}
                          > */}
                          <div
                            className={`${item.stock === "In Stock"
                              ? "bg-green-100 text-green-400"
                              : "bg-red-100 text-red-400"
                              } inline-block px-1 py-1 rounded-md mr-2 `}
                          >

                            <div className="flex justify-center px-1 space-x-2">

                              {/* <div><span>{item.stock}({item.stockQuantity || 0})</span></div> */}
                              <div className="flex items-center">
                                <span>{item.stock}</span>
                                <input
                                  type="number"
                                  min="0"
                                  value={item.stockQuantity || 0} // Editable stock quantity
                                  // onChange={(e) => handleStockQuantityChange(e.target.value)} // Function to handle stock quantity change
                                  className="ml-2 w-10 text-center border rounded"
                                />
                              </div>
                              <button className="bg-white text-red-500 p-1 rounded-full hover:bg-gray-100">
                                <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0.0175781 1L10.5938 1" stroke="#F05252" stroke-width="1.5" />
                                </svg>

                              </button>
                              <button className="bg-white text-green-500 p-1 rounded-full hover:bg-gray-100">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6.23633 0.711914V11.2882" stroke="#0E9F6E" stroke-width="1.5" />
                                  <path d="M0.949219 6L11.5255 6" stroke="#0E9F6E" stroke-width="1.5" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {/* </span> */}
                        </td>
                        <td className="px-6 lg:px-0 py-4 text-[12px] font-medium  whitespace-nowrap ">
                          <button
                            className={` px-2 py-1 rounded-md border border-black`}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* page footer */}
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-y-3 my-10">
            {/* page number */}
            <div className="flex justify-start items-center font-semibold">
              {showingText}
            </div>
            {/* Pagination */}
            <div className="flex justify-end items-center">
              <nav aria-label="Pagination">
                <ul className="inline-flex border rounded-sm shadow-md">
                  <li>
                    <button
                      className="py-2 px-4 text-gray-700 bg-gray-100 focus:outline-none"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &#x2190;
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`py-2 px-4  bg-white text-gray-700 hover:bg-gray-100 focus:outline-none `}
                    >
                      {currentPage - 1}
                    </button>
                    <button
                      className={`py-2 px-4 text-gray-700 bg-gray-100 focus:outline-none`}
                    >
                      {currentPage}
                    </button>
                    <button
                      disabled={
                        currentPage === Math.ceil(data.length / dataPerPage)
                      }
                      onClick={() => paginate(currentPage + 1)}
                      className={`py-2 px-4  bg-white text-gray-700 hover:bg-gray-100 focus:outline-none `}
                    >
                      {currentPage + 1}
                    </button>
                    <span
                      className={`py-2 px-4  bg-white text-gray-700 hover:bg-gray-100 focus:outline-none cursor-not-allowed`}
                    >
                      ...
                    </span>
                    <button
                      className={`py-2 px-4  bg-white text-gray-700 hover:bg-gray-100 focus:outline-none `}
                    >
                      {Math.ceil(data.length / dataPerPage)}
                    </button>
                    <button
                      className="py-2 px-4 text-gray-700 bg-gray-100 focus:outline-none"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage === Math.ceil(data.length / dataPerPage)
                      }
                    >
                      &#x2192;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Modal addModal={() => setShowAddMenu(false)}>
        <div
          id="menu"
          className={`w-full h-full bg-gray-900 bg-opacity-80 top-0 right-0 ${showAddMenu ? "fixed" : "hidden"
            } sticky-0 z-30`}
        >
          <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="w-full md:w-1/2 lg:w-1/2 bg-white p-6 rounded-md shadow-md">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-xl font-semibold">Add Inventory</h3>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowAddMenu(false)
                  }}
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
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Select Product</label>
                <div className="relative mt-2">
                  {/* Trigger for dropdown */}
                  <div
                    onClick={toggleDropdown}
                    className="block w-full pl-4 pr-10 py-2 h-[54px] text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {selectedItem && (
                      <div className="flex items-center justify-start">
                        {/* Image */}
                        <Image
                          className="w-8 h-8 rounded-md"
                          width={30}
                          height={30}
                          src="https://i.ibb.co/sqPhfrt/notimgpng.png"
                          // src={item?.productImage || noPicture}
                          alt={selectedItem.productName || "No Image"}
                        />
                        {/* Text */}
                        <div className="flex flex-col justify-center items-start ml-2">
                          <h2 className="text-sm font-medium">{selectedItem.item.productName || "No Product Available"}</h2>
                        </div>
                      </div>
                    )}


                    {/* Dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                  </div>

                  {/* Dropdown list */}
                  {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {currentData?.map((item, index) => (
                        <ul key={index} className="py-1">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => selectItem({ item })}>
                            <div className="flex items-center">
                              <Image
                                className="w-8 h-8 rounded-md"
                                width={30}
                                height={30}
                                src="https://i.ibb.co/jVPhV6Q/diego-gonzalez-I8l-Durtf-Ao-unsplash.jpg"
                                alt={item.productName}
                              />
                              <span className="ml-2 text-sm">{item.productName}</span>
                            </div>
                          </li>
                          {/* Add more items here */}

                        </ul>
                      ))}
                    </div>
                  )}
                </div>

                <label className="block mt-4 text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  className="mt-2 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none"
                  placeholder="Enter quantity"
                />
              </div>




              <div className="mt-6">
                <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Inventory
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

    </section >
  );

}