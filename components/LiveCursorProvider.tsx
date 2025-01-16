"use client";

import FollowPointer from "@/components/FollowPointer";
import { useMyPresence, useOthers } from "@liveblocks/react/suspense";

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresence({ cursor });
  };
  const handlePointerLeave = () => {
    updateMyPresence({
      cursor: {
        x: 200,
        y: 135,
      },
    });
  };
  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        ))}
      {children}
    </div>
  );
};

export default LiveCursorProvider;
