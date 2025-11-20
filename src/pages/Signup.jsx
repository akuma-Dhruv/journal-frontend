export default function Signup() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Signup</h2>

      <input placeholder="Email" style={{ display: "block", marginBottom: 12 }} />
      <input placeholder="Password" type="password" style={{ display: "block", marginBottom: 12 }} />

      <button style={{ padding: "8px 16px" }}>Create Account</button>
    </div>
  );
}
