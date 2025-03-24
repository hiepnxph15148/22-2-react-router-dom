import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  return <EventsList events={data.events} />;
}
export default EventsPage;


export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Fetching events failed." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData;
  }
}

