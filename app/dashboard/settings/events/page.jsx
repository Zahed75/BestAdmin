import PageHead from "@/components/global/pageHead/PageHead";
import EventsPage from "./EventsPage";

export default function Page() {
  return (
    <main>
      <PageHead pageHead="Home Page Events" />
      <EventsPage />
    </main>
  );
}
