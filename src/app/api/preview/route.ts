import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const collection = searchParams.get("collection");

  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  if (!slug || !collection) {
    return new Response("Missing slug or collection", { status: 400 });
  }

  const path =
    collection === "home-models"
      ? `/models/${slug}`
      : collection === "communities"
        ? `/communities/${slug}`
        : null;

  if (!path) {
    return new Response("Unknown collection", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(`${path}?preview=1`);
}
