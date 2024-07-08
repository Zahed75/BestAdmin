import PageHead from "@/components/global/pageHead/PageHead";
import EventsPage from "./EventsPage";
import Skeleton from "@/components/global/skeleton/Skeleton";

export default function Page() {
  const initialItems = [
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
  ];
  const data = initialItems || [];
  return (
    <main>
      {data?.length >= 0 ? (
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
