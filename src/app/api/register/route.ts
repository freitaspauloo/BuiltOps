import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;

    if (!body.firstName?.trim() || !body.lastName?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }

    // CRM stub — replace with Salesforce / HubSpot integration
    await new Promise((resolve) => setTimeout(resolve, 400));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to submit registration." }, { status: 500 });
  }
}
