"use client";

import { removeUserFromDocument } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/firebase";
import useOwner from "@/lib/useOwner";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { collectionGroup, query, where } from "firebase/firestore";
import { useState, useTransition } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { toast } from "sonner";

const ManageUsers = () => {
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (userId: string) => {
    startTransition(async () => {
      if (!user) return;
      const { success } = await removeUserFromDocument(room.id, userId);

      if (success) {
        toast.success("User removed successfully");
        // router = use
      } else {
        toast.error("Failed to remove user");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>{usersInRoom?.docs.length} Users</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with Access</DialogTitle>
          <DialogDescription>
            Below is the a list of users who have access to this document.
          </DialogDescription>
        </DialogHeader>
        <hr className="my-2" />

        <div className="flex flex-col space-y-2">
          {usersInRoom?.docs.map((doc) => (
            <div
              key={doc.data().userId}
              className="flex items-center justify-between"
            >
              <p className="font-light">
                {doc.data().userId === user?.emailAddresses[0].toString()
                  ? `You ${doc.data().userId}`
                  : doc.data().userId}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline">{doc.data().role}</Button>

                {isOwner &&
                  doc.data().userId !== user?.emailAddresses[0].toString() && (
                    <Button
                      variant={"destructive"}
                      onClick={() => handleDelete(doc.data().userId)}
                      disabled={isPending}
                      size="sm"
                    >
                      {isPending ? "Deleting..." : "X"}
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageUsers;
