"use client";

import { fetchApi } from "@/utils/FetchApi";
import { useEffect, useState } from "react";
import SingleOrderPage from "./SingleOrderPage";

export default function Page({ params }) {
  const id = params.id;

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApi(`/order/getOrderById/${id}`, "GET");
        setData(data?.order);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <main className="">
      <SingleOrderPage  />
    </main>
  );
}
