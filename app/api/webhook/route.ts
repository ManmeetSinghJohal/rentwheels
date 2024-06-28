/* eslint-disable camelcase */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserJSON, WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/userActions";

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not set in .env");
  }

  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing SVIX headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  const eventType = evt.type;
  if (eventType === "user.created") {
    try {
      const { id, email_addresses, image_url, username, first_name, last_name, public_metadata } = evt.data as UserJSON;

      const newUser = await createUser({
        clerkId: id,
        name: `${first_name} ${last_name || ""}`,
        username: username || "",
        email: email_addresses[0].email_address,
        role: public_metadata.role as "ADMIN" | "USER",
        picture: image_url || (public_metadata.picture as string),
      });

      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            ...public_metadata,
            userId: newUser.id,
          },
        });
      }

      return NextResponse.json({ message: "User created", user: newUser });
    } catch (error) {
      console.error("Error processing user.created event:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    try {
      const { id, email_addresses, image_url, username, first_name, last_name, public_metadata } = evt.data as UserJSON;

      const updatedUser = await updateUser({
        clerkId: id,
        name: `${first_name} ${last_name || ""}`,
        username: username || "",
        email: (public_metadata.email as string) || email_addresses[0].email_address,
        role: public_metadata.role as "ADMIN" | "USER",
        picture: (public_metadata.picture as string) || image_url,
      });

      if (updatedUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            ...public_metadata,
            userId: updatedUser.id,
          },
        });
      }

      return NextResponse.json({ message: "User updated", user: updatedUser });
    } catch (error) {
      console.error("Error processing user.updated event:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    try {
      const { id } = evt.data;
      if (!id) {
        throw new Error("User ID is missing in the event data");
      }

      const deletedUser = await deleteUser(id);

      return NextResponse.json({ message: "User Deleted", user: deletedUser });
    } catch (error) {
      console.error("Error processing user.deleted event:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }

  return new Response("Event processed", { status: 200 });
}
