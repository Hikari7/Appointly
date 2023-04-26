import * as React from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

function UserAnimation({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <div ref={ref}>
        <div
          style={{
            transform: isInView ? "none" : "translateY(20px)",
            opacity: isInView ? 1 : 0,
            transition: "all .5s ",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default UserAnimation;
