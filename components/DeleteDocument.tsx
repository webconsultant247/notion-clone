"use client";

import { deleteDocument } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

const DeleteDocument = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleInvite = async (e: FormEvent) => {
    const roomId = pathname.split("/").pop();
    if (!roomId) return;
    startTransition(async () => {
      // delete document
      const { success } = await deleteDocument(roomId);

      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("User added to the room successfully");
      } else {
        toast.error("Failed to add a user to the room");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure to delete this document?
          </DialogTitle>
          <DialogDescription>
            This action will delete the document and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleInvite} className="flex ga">
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={() => {}} disabled={!email || isPending}>
            {isPending ? "Sending an invite..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDocument;
