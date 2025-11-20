import { useState,useEffect } from "react";

export default function ExpenseTracker({onChange}) {
  const [items, setItems] = useState([
    { id: 1, amount: "", label: "" }
  ]);

  function addItem() {
    setItems([...items, { id: Date.now(), amount: "", label: "" }]);
  }

  function updateItem(id, key, value) {
    setItems(
      items.map(it =>
        it.id === id ? { ...it, [key]: value } : it
      )
    );
  }

  const total = items.reduce(
    (sum, it) => sum + (parseFloat(it.amount) || 0),
    0
  );

  useEffect(() => {
  onChange && onChange(items);
}, [items]);

  return (
    <div>
      {items.map(item => (
      <div key={item.id} style={{
  display: "flex",
  gap: 10,
  marginBottom: 10,
  alignItems: "center"
}}>

  <div style={{
    position: "relative",
    width: 120,
    display: "flex",
    alignItems: "center"
  }}>
    
    {/* Rupee Prefix */}
    <span
      style={{
        position: "absolute",
        left: 0,
        fontSize: 18,
        color: "#444"
      }}
    >
      ₹
    </span>

    <input
      type="number"
      placeholder="0"
      value={item.amount}
      onChange={(e) => updateItem(item.id, "amount", e.target.value)}
      style={{
        width: "100%",
        paddingLeft: "20px", // <-- space so we don't overlap rupee sign
        background: "transparent",
        border: "none",
        borderBottom: "1px dashed #ccc",
        outline: "none",
        fontSize: 18
      }}
    />
  </div>

  <input
    placeholder="What is this for?"
    value={item.label}
    onChange={(e) => updateItem(item.id, "label", e.target.value)}
    style={{
      background: "transparent",
      border: "none",
      borderBottom: "1px dashed #ccc",
      flex: 1,
      outline: "none",
      fontSize: 18
    }}
  />
</div>


      ))}

      <button
        onClick={addItem}
        style={{
          padding: "6px 12px",
          fontSize: 18,
          background: "#efe7d8",
          border: "1px dashed #c7bba3",
          borderRadius: 8,
          cursor: "pointer",
          marginTop: 10
        }}
      >
        + Add Expense
      </button>

      <div style={{ marginTop: 20, fontSize: 20, fontWeight: 600,  fontFamily: "Inter, system-ui, sans-serif" }}>
        Total: ₹{total}
      </div>
    </div>
  );
}
