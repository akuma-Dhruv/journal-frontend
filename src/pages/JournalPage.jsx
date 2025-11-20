import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import SectionCard from "../components/Journal/SectionCard";
import TodoList from "../components/Journal/TodoList";
import HabitTracker from "../components/Journal/HabitTracker";
import ExpenseTracker from "../components/Journal/ExpenseTracker";

export default function JournalPage() {
  const { date } = useParams();

  // ===== MAIN TEXT SECTIONS =====
  const [highlight, setHighlight] = useState("");
  const [learning, setLearning] = useState("");
  const [manifestation, setManifestation] = useState("");
  const [question, setQuestion] = useState("");
  const [happy, setHappy] = useState("");
  const [failed, setFailed] = useState("");
  const [imagine, setImagine] = useState("");
  const [futureSelf, setFutureSelf] = useState("");
  const [idea, setIdea] = useState("");

  // ===== CHILD SECTION DATA =====
  const [todos, setTodos] = useState([]);
  const [habits, setHabits] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // ===== FORMAT DATE =====
  function formatPrettyDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  // ===== BUILD PAYLOAD =====
  function getJournalPayload() {
    return {
      date,
      highlight,
      learning,
      expenses,
      manifestation,
      question,
      todos,
      happy,
      failed,
      habits,
      imagine,
      futureSelf,
      idea
    };
  }

  // ===== SIGN OFF SAVE BUTTON =====
  async function handleSignOff() {
    const payload = getJournalPayload();

    try {
      const res = await fetch("http://localhost:8080/journal/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      alert("Journal saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save journal.");
    }
  }

  return (
    <>
      <Navbar />

      <div className="notebook-container">
        
        <div className="sticky-header">
          Journal — {formatPrettyDate(date)}
        </div>

        <SectionCard title="Highlight of the Day">
          <textarea 
            placeholder="Best moment today..." 
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
          />
        </SectionCard>

        <SectionCard title="Learning of the Day">
          <textarea 
            placeholder="What did you learn today?" 
            value={learning}
            onChange={(e) => setLearning(e.target.value)}
          />
        </SectionCard>

        <SectionCard title="Total Expense">
          <ExpenseTracker onChange={setExpenses} />
        </SectionCard>

        <SectionCard title="Manifestation">
          <textarea 
            placeholder="What are you manifesting?" 
            value={manifestation}
            onChange={(e) => setManifestation(e.target.value)}
          />
        </SectionCard>

        <SectionCard title="Question of the Day">
          <textarea 
            placeholder="Reflect on this..." 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </SectionCard>

        <SectionCard title="Todos">
          <TodoList onChange={setTodos} />
        </SectionCard>

        <SectionCard title="Happy Moments">
          <textarea 
            placeholder="What made you smile?" 
            value={happy}
            onChange={(e) => setHappy(e.target.value)}
          />
        </SectionCard>

        <SectionCard title="What I Failed to Do">
          <textarea 
            placeholder="Be honest..." 
            value={failed}
            onChange={(e) => setFailed(e.target.value)}
          />
        </SectionCard>

        <SectionCard title="Trackers">
          <HabitTracker date={date} onChange={setHabits} />
        </SectionCard>

        <SectionCard title="Imagine (Story)">
          <textarea 
            placeholder="Write something creative..." 
            value={imagine}
            onChange={(e) => setImagine(e.target.value)}
          />
        </SectionCard>

        <SectionCard title="Message to Future Self">
          <textarea 
            placeholder="Dear future me..." 
            value={futureSelf}
            onChange={(e) => setFutureSelf(e.target.value)}
          />
        </SectionCard>

        <SectionCard title="Idea of the Day">
          <textarea 
            placeholder="New idea you got today..." 
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
        </SectionCard>

        {/* Sign Off Button */}
        <button className="signoff-btn" onClick={handleSignOff}>
          Sign Off
        </button>

      </div>
    </>
  );
}
