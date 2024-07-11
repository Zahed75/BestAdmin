"use client";
import PageHead from "@/components/global/pageHead/PageHead";
import EventsPage from "./EventsPage";
import Skeleton from "@/components/global/skeleton/Skeleton";
import { fetchApi } from "@/utils/FetchApi";
import { useEffect, useState } from "react";

export default function Events() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchApi(`/event/products`, "GET");
        setData(res);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const initialItems = data?.productsAndEvents;

console.log("initialItems", initialItems);
  return (
    <main>
      {initialItems?.length >= 0 ? (
        <div>
          <PageHead pageHead="Home Page Events" />
          <EventsPage initialItems={initialItems} />
        </div>
      ) : (
        <Skeleton />
      )}
    </main>
  );
}
