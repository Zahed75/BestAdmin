"use client";
import { fetchOrders } from "@/redux/slice/orderSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardTable() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const allOrders = orders?.orders?.orders || [];
  const latestOrders = allOrders.slice().reverse().slice(0, 10);

  function formatDate(dateString) {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h5 className="text-2xl font-bold">Recent Orders</h5>
        <Link href="/dashboard/orders" className="text-md font-bold">
          ViewAll
        </Link>
      </div>

      {/* table component*/}
      <div className="w-full mx-auto my-5">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full table-auto dark:divide-gray-700 overflow-x-scroll">
                  {/* table head */}
                  <thead className="bg-gray-100 ">
                    <tr>
                      <th
                        scope="col"
                        onClick={() => handleSort("orderId")}
                        className="py-3 px-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Order &#x21d5;
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("createdAt")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Order time &#x21d5;
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("channel")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Channel &#x21d5;
                      </th>

                      <th
                        scope="col"
                        onClick={() => handleSort("orderStatus")}
                        className="py-3 text-sm font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer"
                      >
                        Status &#x21d5;
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-black">
                    {latestOrders?.map((item, i) => (
                      <tr
                        key={item._id}
                        className={`${
                          i % 2 !== 0 ? "" : "bg-gray-100"
                        } hover:bg-gray-100 duration-700`}
                      >
                        <td className="py-4 px-3 text-sm font-medium text-gray-900 whitespace-nowrap underline underline-offset-2">
                          <Link href={`/dashboard/orders/${item._id}`}>
                            {item.orderId}
                          </Link>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-500 whitespace-nowrap ">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          <span className="text-md">৳</span>
                          {item.totalPrice}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap ">
                          {item.channel}
                        </td>

                        <td className="py-4 text-[12px] font-medium  whitespace-nowrap ">
                          <span
                            className={`${
                              item.orderStatus === "Received"
                                ? "bg-yellow-200 text-yellow-800"
                                : item.orderStatus === "Confirmed"
                                ? "bg-blue-200 text-blue-800"
                                : item.orderStatus === "Delivered"
                                ? "bg-green-200 text-green-800"
                                : item.orderStatus === "On-Hold"
                                ? "bg-red-200 text-red-800"
                                : item.orderStatus === "Spammed"
                                ? "bg-red-200 text-red-800"
                                : item.orderStatus === "Cancelled"
                                ? "bg-red-200 text-red-800"
                                : item.orderStatus === "Dispatched"
                                ? "bg-orange-200 text-orange-600"
                                : ""
                            } px-2 py-1 rounded-full`}
                          >
                            {item.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
