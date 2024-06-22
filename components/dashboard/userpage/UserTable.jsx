"use client";
import Link from "next/link";
import { useState } from "react";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import Modal from "@/components/global/modal/Modal";

export default function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5); // Change this value to adjust the number of rows per page
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAction, setShowAction] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const data = [
    {
      id: 1,
      userName: "samzaman",
      name: "Samsuz Zaman",
      role: "Manager",
      email: "zaman400@gmail.com",
      phone: "01700000000",
    },
    {
      id: 2,
      userName: "asadzaman",
      name: "Asad Zaman",
      role: "Employee",
      email: "asad@gmail.com.bd",
      phone: "01700074851",
    },
    {
      id: 3,
      userName: "sakib",
      name: "Sakib Al Hasan",
      role: "Administrator",
      email: "sakib@bd.com",
      phone: "01700694000",
    },
    {
      id: 4,
      userName: "tamim",
      name: "Tamim Iqbal",
      role: "Store Manager",
      email: "tamim@gmail.com",
      phone: "0178741259",
    },
    {
      id: 5,
      userName: "mashrafi",
      name: "Mashrafi Bin Mortoza",
      role: "Employee",
      email: "nasgraf74@gmail.com",
      phone: "01700074851",
    },
    {
      id: 6,
      userName: "mushfiq",
      name: "Mushfiqur Rahim",
      role: "Store Manager",
      email: "mushi99@gmail.com",
      phone: "0178741259",
    },
  ];

  const titleData = [
    "All",
    "Administrator(5)",
    "Manager(21)",
    "Store Manager(71)",
    "Employee(80)",
  ];

  const handleTitleButtonClick = (title) => {
    if (title === "All") {
      setSearchQuery("");
    } else {
      setSearchQuery(title);
    }
  };

  // Sorting function
  const sortedData = data.sort((a, b) => {
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
        <div className="flex justify-between md:justify-start items-center  w-full">
          <h5 className="text-lg md:text-2xl font-bold">All Users</h5>
          <button
            onClick={() => setShowButton(!showButton)}
            className="text-sm md:text-lg text-gray-500 block md:hidden"
          >
            {showButton ? (
              <CiMenuFries className="text-xl font-bold" />
            ) : (
              <CiMenuBurger className="text-xl font-bold" />
            )}
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 ml-auto w-full md:col-span-2">
          {/* search bar */}
          <div className="relative flex justify-end items-center w-full py-2 rounded-lg focus-within:shadow-lg bg-[#F9FAFB] shadow-md overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
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
          <div className="flex justify-end items-center gap-3 ml-auto ">
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
                      // onClick={handleUpdateProduct}
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                    >
                      Update
                    </button>
                  </li>
                  <li>
                    <button
                      // onClick={handleDeleteProduct}
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-white border border-black bg-black rounded-lg shadow-md">
              <button
                onClick={() => setShowMenu(true)}
                className="flex justify-center items-center px-2 py-1"
              >
                <span className="text-xl font-semibold mr-1">+</span>{" "}
                <span className="text-nowrap">Add Users</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* button component */}
      <div
        className={`
      ${showButton ? "flex" : "hidden"}
       flex-col md:flex-row gap-2 pb-5 border-b-2 justify-start items-center mt-5 `}
      >
        {titleData.map((title, index) => (
          <button
            key={index}
            onClick={() => handleTitleButtonClick(title)}
            className="bg-gray-100 text-gray-500 px-10 py-2 text-md rounded-md hover:bg-black hover:text-white duration-700 shadow-md w-full md:w-auto"
          >
            {title}
          </button>
        ))}
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
                          <label for="checkbox-all" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("userName")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Username &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("name")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Name &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("role")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Role &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("email")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Email &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("phone")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Phone &#x21d5;
                      </th>

                      <th
                        scope="col"
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Action
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
                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap underline underline-offset-2 cursor-pointer">
                          <Link href={`/dashboard/usermanagement/${item.id}`}>
                            {item.userName}{" "}
                          </Link>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          <div className="flex justify-start items-center">
                            <img
                              className="w-7 h-7 rounded-md"
                              src="https://i.ibb.co/jVPhV6Q/diego-gonzalez-I8l-Durtf-Ao-unsplash.jpg"
                              alt=""
                            />
                            <span className="ml-2">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {item.role}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {item.email}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {item.phone}
                        </td>

                        <td className="py-4 text-[12px] font-medium  whitespace-nowrap ">
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
                <span className="text-3xl font-bold">Add Categories</span>
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
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <form 
              // onSubmit={handleSubmit}
               className="w-full mt-10">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="categoriesName"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Categories Name
                    </label>
                    <input
                      type="text"
                      id="categoriesName"
                      name="categoriesName"
                      required
                      className="border border-gray-300 rounded-md p-2 focus:outline-noneF"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label
                      htmlFor="categoriesSlug"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Slug
                    </label>
                    <input
                      type="text"
                      id="categoriesSlug"
                      readOnly
                      disabled
                      className="border border-gray-300 rounded-md p-2 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="parentCategoryId"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Parent Categories
                  </label>
                  <br />
                  <div className="relative flex border border-gray-300 px-2 mt-1 rounded-md bg-white hover:border-gray-400">
                    <svg
                      className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 412 232"
                    >
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <select
                      id="parentCategoryId"
                      name="parentCategoryId"
                      className=" text-gray-600 h-10 pl-5 pr-10 w-full focus:outline-none appearance-none"
                    >
                      <option value="0">Select Parent Category</option>
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
                    htmlFor="note"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    cols={30}
                    rows={3}
                    optional
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
    </section>
  );
}
