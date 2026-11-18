import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let cached: Payload | null = null;

export function isPayloadConfigured() {
  return Boolean(process.env.PAYLOAD_SECRET);
}

export async function getPayloadClient(): Promise<Payload | null> {
  if (!isPayloadConfigured()) return null;
  if (cached) return cached;
  cached = await getPayload({ config });
  return cached;
}
