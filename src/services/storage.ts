import type { ClubEvent } from "../types/types";

const API_URL = "http://localhost:3001";

// Fetch events from db.json API
export async function getEvents(): Promise<ClubEvent[]> {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json() as Promise<ClubEvent[]>;
}

export async function createEvent(
  event: Omit<ClubEvent, "id">,
): Promise<ClubEvent> {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  return response.json() as Promise<ClubEvent>;
}

import type { Seller } from "../types/types";

const API_URL_SELLER = "http://localhost:3001";

// Fetch all sellers
export async function getSellers(): Promise<Seller[]> {
  const response = await fetch(`${API_URL_SELLER}/sellers`);

  if (!response.ok) {
    throw new Error("Failed to fetch sellers");
  }

  return response.json() as Promise<Seller[]>;
}
