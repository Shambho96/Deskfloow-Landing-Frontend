import type { Channel } from "@/types";

/**
 * Channel categories shown in the OTA visualisation. Names are used for
 * recognition only — no partnership or certified integration is implied.
 * `state` reflects this prototype: nothing is connected to a live OTA yet.
 */
export const channels: Channel[] = [
  { id: "direct", name: "Direct Website", short: "DW", color: "#8C5CFF", state: "demo" },
  { id: "booking", name: "Booking.com", short: "B.", color: "#1F4FA3", state: "demo" },
  { id: "agoda", name: "Agoda", short: "Ag", color: "#E5484D", state: "demo" },
  { id: "mmt", name: "MakeMyTrip", short: "MM", color: "#D9332B", state: "setup-required" },
  { id: "expedia", name: "Expedia", short: "Ex", color: "#F2B705", state: "demo" },
  { id: "airbnb", name: "Airbnb", short: "Ab", color: "#FF5A5F", state: "setup-required" },
  { id: "goibibo", name: "Goibibo", short: "Go", color: "#F26B1D", state: "setup-required" },
  { id: "corporate", name: "Corporate", short: "Co", color: "#5427B8", state: "demo" },
  { id: "walkin", name: "Walk-in", short: "Wi", color: "#18A874", state: "demo" },
];

export const channelStateLabel: Record<Channel["state"], string> = {
  connected: "Connected",
  "setup-required": "Setup required",
  demo: "Demo simulation",
};
