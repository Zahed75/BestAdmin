"use client";
import Link from "next/link";
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Image from "next/image";
import { FaCaretDown, FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdFilterAltOff } from "react-icons/md";
import Pagination from "@/components/global/pagination/Pagination";

export default function CustomersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAction, setShowAction] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const data = [
    {
      id: 1,
      userName: "shahriarhasan",
      customerName: "Md Shahriar Hasan",
      emailAddress: "bro404@gmail.com",
      city: "Dhaka",
      phoneNumber: "01913865741",
    },
    {
      id: 2,
      userName: "imranhasan",
      customerName: "Md Imran Hasan",
      emailAddress: "imran@gmail.com",
      city: "Dhaka",
      phoneNumber: "01745821569",
    },
    {
      id: 3,
      userName: "zahidhasar",
      customerName: "Md Zahid Hasan",
      emailAddress: "zahed@gmail.com",
      city: "Chittagong",
      phoneNumber: "01985621569",
    },
    {
      id: 4,
      userName: "mdshaiadul",
      customerName: "Md Shaiadul Basar",
      emailAddress: "mdshaiadul@gmail.com",
      city: "Dhaka",
      phoneNumber: "01745821569",
    },
    {
      id: 5,
      userName: "tasinbro",
      customerName: "Md Tasin",
      emailAddress: "tasin@gmail.com",
      city: "Dhaka",
      phoneNumber: "01913865741",
    },
  ];

  // Search function
  const filteredData = data.filter((item) => {
    return (
      item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.emailAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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

  // make pdf
  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "landscape" });

    doc.autoTable({
      html: "#joy-bangla",
      // theme: "grid",
      // styles: {
      //   font: "helvetica",
      //   lineColor: [0, 0, 0],
      //   lineWidth: 0.5,
      // },
      headStyles: {
        fillColor: "#F26522",
        textColor: [255, 255, 255],
      },
    });

    doc.save("dataTable.pdf");
  };
  return (
    <section className="w-full my-5">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-y-3 mt-5 border-b-2 pb-5">
        <div className="flex justify-between md:justify-start items-center w-full">
          <h5 className="text-lg md:text-2xl font-bold">All Customers</h5>
        </div>
        <div className="flex flex-col md:flex-row justify-start items-center gap-3 ml-auto w-full md:col-span-2">
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
          <div className="flex justify-between items-center gap-3 ml-auto">
            <div className="ml-auto border border-[#F9FAFB] bg-[#F9FAFB] rounded-lg shadow-md ">
              <button
                onClick={exportPdf}
                className="flex mx-auto py-2 text-nowrap px-3"
              >
                Export As &#x2193;
              </button>
            </div>
            <div className="flex justify-between items-center gap-3 relative">
              <div className=" bg-[#F9FAFB] rounded-lg shadow-md ">
                <button
                  onClick={() => setShowAction(!showAction)}
                  className="bg-[#F9FAFB] mx-4 py-2 flex justify-center items-center"
                >
                  Action <FaCaretDown className="ml-3" />
                </button>
              </div>
              <div
                onMouseLeave={() => setShowAction(false)}
                className={`
              ${showAction ? "block" : "hidden"}
              absolute top-11 bg-white text-base list-none divide-y divide-gray-100 rounded shadow-md w-full`}
                id="dropdown"
              >
                <ul className="py-1" aria-labelledby="dropdown">
                  <li>
                    <button
                      // onClick={handleUpdateCoupon}
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                    >
                      Update
                    </button>
                  </li>
                  <li>
                    <button
                      // onClick={handleDeleteCoupon}
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-10 h-10 bg-[#F9FAFB] shadow-md rounded-full">
              <FaFilter
                className={`${
                  !showFilter ? "block" : "hidden"
                } text-primary cursor-pointer w-6 h-6 flex justify-center items-center mx-auto my-2 p-1`}
                onClick={() => setShowFilter(!showFilter)}
              />
              <MdFilterAltOff
                className={`${
                  showFilter ? "block" : "hidden"
                } text-primary cursor-pointer w-8 h-8 flex justify-center items-center mx-auto my-1 p-1`}
                onClick={() => setShowFilter(!showFilter)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* table component*/}
      <div className="w-full mx-auto my-5">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full dark:divide-gray-700">
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
                        onClick={() => handleSort("userName")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        User Name &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("customerName")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Customer Name &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("emailAddress")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Email Address &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("city")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        City &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("phoneNumber")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Phone Number &#x21d5;
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-black">
                    {currentData?.map((item) => (
                      <tr
                        key={item.id}
                        className={`${
                          item.id % 2 !== 0 ? "" : "bg-gray-100"
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
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          <Link href={`/dashboard/customers/${item.id}`}>
                            <span className="underline underline-offset-2">
                              {item.userName}
                            </span>
                          </Link>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          <Link href={`/dashboard/customers/${item.id}`}>
                            <div className="flex justify-start items-center">
                              <Image
                                width={28}
                                height={28}
                                className="w-7 h-7 rounded-md"
                                src="https://i.ibb.co/jVPhV6Q/diego-gonzalez-I8l-Durtf-Ao-unsplash.jpg"
                                alt=""
                              />
                              <span className="ml-2">{item.customerName}</span>
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {item.emailAddress}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {item.city}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {item.phoneNumber}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            dataPerPage={dataPerPage}
            totalItems={sortedData.length}
            paginate={paginate}
            showingText={showingText}
            data={sortedData}
          />
        </div>
      </div>

      <div
        className={`${
          showFilter ? "block" : "hidden"
        } fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50`}
      >
        <div className="bg-white w-11/12 md:w-1/3 mx-auto my-10 rounded-lg shadow-lg p-5">
          <div className="flex justify-between items-center">
            <h5 className="text-lg font-bold">Filter</h5>
            <IoMdClose
              onClick={() => setShowFilter(false)}
              className="p-1 rounded-full bg-gray-100 w-6 h-6 cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-3 my-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="userName"
                className="text-sm font-semibold text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="customerName"
                className="text-sm font-semibold text-gray-600"
              >
                Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="emailAddress"
                className="text-sm font-semibold text-gray-600"
              >
                Email Address
              </label>
              <input
                type="text"
                id="emailAddress"
                name="emailAddress"
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="city"
                className="text-sm font-semibold text-gray-600"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-semibold text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="border border-gray-300 rounded-md p-2 focus:outline-none "
              />
            </div>
            <div className="flex justify-end">
              <button className="p-2 rounded-lg bg-black text-white w-full">
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
