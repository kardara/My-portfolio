import React from "react";

/** Card with a soft light that follows the cursor (pure CSS variables, no re-renders). */
const Spotlight: React.FC<React.HTMLAttributes<HTMLDivElement> & { color?: string }> = ({
  children,
  className = "",
  color = "var(--color-primary)",
  style,
  ...rest
}) => (
  <div
    {...rest}
    onPointerMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
    }}
    className={`spotlight group relative overflow-hidden ${className}`}
    style={{ ...style, ["--spot" as string]: color }}
  >
    {children}
  </div>
);

export default Spotlight;
