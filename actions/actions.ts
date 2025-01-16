"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export const createNewDocument = async () => {
  // Create a new document in the database
  auth.protect();
  const { sessionClaims } = await auth();
  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Document",
  });
  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
};

export const deleteDocument = async (roomId: string) => {
  auth.protect();

  console.log(`Deleting document ${roomId}`);

  try {
    // delete document reference
    await adminDb.collection("documents").doc(roomId).delete();
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();
    // delete room reference
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // delete liveblocks room

    await liveblocks.deleteRoom(roomId);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const inviteUserToDocument = async (roomId: string, email: string) => {
  auth.protect();
  console.log(`Inviting user ${email} to document ${roomId}`);

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const removeUserFromDocument = async (roomId: string, email: string) => {
  auth.protect();
  console.log(`Removing user ${email} from document ${roomId}`);

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
