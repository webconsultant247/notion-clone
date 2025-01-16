"use client";
import React, { ReactNode } from "react";

import {
  ClientSideSuspense,
  RoomProvider as RoomProviderWrapper,
} from "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/client";
import LoadingSpinner from "@/components/LoadingSpinner";
import LiveCursorProvider from "@/components/LiveCursorProvider";

const RoomProvider = ({
  roomId,
  children,
}: {
  roomId: string;
  children: ReactNode;
}) => {
  return (
    <RoomProviderWrapper
      id={roomId}
      initialPresence={{
        cursor: {
          x: 200,
          y: 135,
        },
      }}
      initialStorage={{
        people: new LiveList([new LiveObject({ name: "Ali", age: 30 })]),
      }}
    >
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
};

export default RoomProvider;
