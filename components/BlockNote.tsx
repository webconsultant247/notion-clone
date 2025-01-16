"use client";
import React from "react";
import { Doc } from "yjs";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { useSelf } from "@liveblocks/react/suspense";
import stringToColor from "@/lib/stringToColor";

type BlockNoteProps = {
  doc: Doc;
  provider: any;
  darkMode: boolean;
};

const BlockNote = ({ doc, provider, darkMode }: BlockNoteProps) => {
  const userInfo = useSelf((me) => me.info);

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color: stringToColor(userInfo.email).backgroundColor,
      },
    },
  });

  // const editor = new BlockNoteEditor(doc);
  return (
    <div className="relative max-w-6xl mx-auto">
      <BlockNoteView
        className="min-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default BlockNote;
