import * as React from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

function AnimateInView({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <div ref={ref}>
        <span
          style={{
            transform: isInView ? "none" : "translateY(50px)",
            opacity: isInView ? 1 : 0,
            transition: "all .5s ",
          }}
        >
          {children}
        </span>
      </div>
    </>
  );
}

export default AnimateInView;
