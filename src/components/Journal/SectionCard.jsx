import { useState } from "react";

export default function SectionCard({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="section-card">
      <div
        className="section-title"
        onClick={() => setOpen(!open)}
      >
        {title} {open ? "✦" : "✧"}
      </div>

      {open && (
        <div style={{ marginTop: 8 }}>
          {children}
        </div>
      )}
    </div>
  );
}
