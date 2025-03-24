import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const data = useRouteLoaderData("event-detail");
  return <EventItem event={data.event} />
  ;
};
export default EventDetailPage;

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

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Deleting event failed." }), {
      status: 500,
    });
  }
  return Response.redirect("/events");
}