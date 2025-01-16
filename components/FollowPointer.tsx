"use client";
import stringToColor from "@/lib/stringToColor";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
const FollowPointer = ({
  info: { name, email, avatar },
  x,
  y,
}: {
  info: {
    name: string;
    email: string;
    avatar: string;
  };
  x: number;
  y: number;
}) => {
  const { backgroundColor, textColor } = stringToColor(email || " 1");
  return (
    <motion.div
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
      className="h-4 w-4 rounded-full absolute z-50"
    >
      <svg
        className={`h-6 w-6 text-[${backgroundColor}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-${backgroundColor}`}
        version="1.1"
        id="Capa_1"
        width="800px"
        height="800px"
        viewBox="0 0 266.495 266.494"
        fill={backgroundColor}
      >
        <g>
          <g>
            <path
              d="M150.036,266.494c-0.264,0-0.517-0.006-0.792-0.018c-6.102-0.337-11.332-4.474-13.046-10.347l-26.067-89.027
			l-95.203-18.867c-6.014-1.194-10.614-6.059-11.476-12.123c-0.858-6.062,2.201-12.016,7.65-14.832L242.143,1.617
			C247.5-1.175,254.057-0.29,258.518,3.8c4.474,4.101,5.885,10.55,3.562,16.146l-98.743,237.655
			C161.097,263.018,155.836,266.494,150.036,266.494z"
            />
          </g>
        </g>
      </svg>
      <motion.div
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className="w-8 h-8  rounded-full"
      >
        <Image
          src={avatar}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default FollowPointer;
