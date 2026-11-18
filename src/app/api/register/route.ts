import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const field = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");

    // Honeypot: real users never fill the hidden "company" field. Respond with a
    // generic success so bots can't detect the rejection, and skip the CRM stub.
    if (field("company").trim() !== "") {
      console.warn("[register] honeypot triggered — submission dropped", {
        email: field("email"),
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ ok: true });
    }

    if (!field("firstName").trim() || !field("lastName").trim() || !field("email").trim() || !field("phone").trim()) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field("email"))) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }

    // Consent is required for the v4 form; older frozen versions don't send the
    // field, so only enforce it when present.
    if ("consent" in body && body.consent !== true) {
      return NextResponse.json(
        { ok: false, error: "Consent to be contacted is required." },
        { status: 400 },
      );
    }

    // CRM stub — no real integration is configured. Replace this block with a
    // Salesforce / HubSpot API call (map firstName/lastName/email/phone/realtor/
    // message + consent timestamp) when credentials are available.
    await new Promise((resolve) => setTimeout(resolve, 400));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to submit registration." }, { status: 500 });
  }
}
