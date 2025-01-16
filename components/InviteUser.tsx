"use client";

import { inviteUserToDocument } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

const InviteUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const handleInvite = async (e: FormEvent) => {
    const roomId = pathname.split("/").pop();
    if (!roomId) return;
    startTransition(async () => {
      // delete document
      const { success } = await inviteUserToDocument(roomId, email);

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
        <Button variant={"outline"}>Invite</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Invite users to collaborate on your document
          </DialogTitle>
          <DialogDescription>
            Invite a user using their email address.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleInvite} className="flex gap-2">
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

export default InviteUser;
