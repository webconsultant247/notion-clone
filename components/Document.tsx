"use client";
import Avatars from "@/components/Avatars";
import DeleteDocument from "@/components/DeleteDocument";
import Editor from "@/components/Editor";
import InviteUser from "@/components/InviteUser";
import ManageUsers from "@/components/ManageUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import useOwner from "@/lib/useOwner";
import { doc, updateDoc } from "firebase/firestore";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

const Document = ({ id }: { id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState<string>("");
  const [isUpdating, startTransition] = useTransition();

  const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        // update title

        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };
  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="flex max-w-6xl mx-auto justify-between pb-t">
        <form className="flex space-x-2 flex-1" onSubmit={updateTitle}>
          {/* update title  */}
          <Input
            value={input}
            className="bg-white"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>

          {isOwner && (
            <>
              {/* Invite Users */}
              <InviteUser />
              <DeleteDocument />
            </>
          )}
        </form>
      </div>
      <div className="flex max-w-6xl mx-auto justify-between pb-5 items-center mt-5">
        <ManageUsers />

        <Avatars />
      </div>
      <hr className="my-5" />
      <Editor />
    </div>
  );
};

export default Document;
