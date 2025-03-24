import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");
  return <EventForm event={data.event} method="patch"/>;
};

export default EditEventPage;

export async function loader({ params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Fetching event failed." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData;
  }
}


