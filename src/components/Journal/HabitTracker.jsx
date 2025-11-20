import { useState, useEffect } from "react";

export default function HabitTracker({ date,onChange }) {
  const localKey = "journal_habits_v1";

  const defaultHabits = [
    { id: 1, name: "Drink Water", done: false },
    { id: 2, name: "Meditation", done: false },
    { id: 3, name: "Gym", done: false }
  ];

  const [habits, setHabits] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(localKey));
      // stored contains [{id,name}] — we restore with done=false for new day
      setHabits((stored && stored.length ? stored : defaultHabits).map(h => ({ ...h, done: false })));
    } catch {
      setHabits(defaultHabits.map(h => ({ ...h, done: false })));
    }
  }, [date]);

  useEffect(() => {
    // persist name list (without done) so next day we can carry them over
    const toStore = habits.map(h => ({ id: h.id, name: h.name }));
    localStorage.setItem(localKey, JSON.stringify(toStore));
  }, [habits]);

  useEffect(() => {
  onChange && onChange(habits);
}, [habits]);


  function toggleHabit(id) {
    setHabits(habits.map(h => (h.id === id ? { ...h, done: !h.done } : h)));
  }

  function editHabit(id, value) {
    setHabits(habits.map(h => (h.id === id ? { ...h, name: value } : h)));
  }

  function addHabit() {
    setHabits([...habits, { id: Date.now(), name: "", done: false }]);
  }

  function removeHabit(id) {
    setHabits(habits.filter(h => h.id !== id));
  }

  return (
    <div>
      {habits.map(h => (
        <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <input
            type="checkbox"
            checked={h.done}
            onChange={() => toggleHabit(h.id)}
            style={{ width: 22, height: 22 }}
          />

          <input
            value={h.name}
            onChange={(e) => editHabit(h.id, e.target.value)}
            placeholder="Add habit…"
            style={{
              borderBottom: "1px dashed #9b9383",
              background: "transparent",
              border: "none",
              flex: 1,
              minWidth: 80,
              outline: "none",
              fontSize: 18,
              padding: "6px 4px",
              color: "#3b372c",
              boxSizing: "border-box"
            }}
          />

          <button
            onClick={() => removeHabit(h.id)}
            aria-label="remove habit"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#a66",
              fontSize: 18,
              padding: 6
            }}
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={addHabit}
        style={{
          padding: "8px 14px",
          fontSize: 16,
          background: "#efe7d8",
          border: "1px dashed #c7bba3",
          borderRadius: 8,
          cursor: "pointer",
          marginTop: 6
        }}
      >
        + Add Habit
      </button>
    </div>
  );
}
