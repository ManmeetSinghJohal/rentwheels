import { prisma } from "../prisma/client";

const CLERK_API_URL = "https://api.clerk.com/v1";

async function updateMetadataForUser(clerkId: string, metadata: { userId: string }) {
  const url = `${CLERK_API_URL}/users/${clerkId}/metadata`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_metadata: metadata,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to update metadata for user ${clerkId}: ${errorDetails}`);
    }

    console.log(`Metadata updated for user ${clerkId}`);
  } catch (error) {
    console.error(`Error updating user ${clerkId}:`, error instanceof Error ? error.message : error);
  }
}

async function main() {
  console.log("Starting updating metadata for all users...");
  const users = await prisma.user.findMany();

  if (!users) {
    console.log("No users found.");
    return;
  }

  console.log(`Found ${users.length} users. Updating metadata...`);

  for (const user of users) {
    console.log(`Updating metadata for user ${user.id} and clerkId ${user.clerkId}...`);
    await updateMetadataForUser(user.clerkId, { userId: `${user.id}` });
  }
}

main().then(() => console.log("Metadata update complete."));
