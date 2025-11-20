import Navbar from "../components/Layout/Navbar";

export default function Home() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h1>Welcome Back 👋</h1>
        <a href={`/journal/${today}`}>Go to Today’s Journal →</a>
      </div>
    </>
  );
}
