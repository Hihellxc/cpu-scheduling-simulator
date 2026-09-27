import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Collapsible({ idx, title, defaultOpen = false, badge, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <div className="section-head">
        <span className="idx">{idx}</span>
        <button className="collapsible-head" onClick={() => setOpen((o) => !o)}>
          <h2>{title}</h2>
          {badge && <span className="badge">{badge}</span>}
          <span className="collapsible-chevron">
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </button>
      </div>
      {open && children}
    </>
  );
}
