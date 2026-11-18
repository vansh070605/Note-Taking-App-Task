import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// One component serves /login and /signup
export default function AuthPage({ mode }) {
  const isSignup = mode === "signup";
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await (isSignup ? signup(form) : login(form));
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="auth">
      <form className="panel" onSubmit={submit}>
        <h1>📝 NoteNest</h1>
        <p className="muted">{isSignup ? "Create your account" : "Welcome back"}</p>
        {error && <p className="error">{error}</p>}
        {isSignup && (
          <label>Name<input value={form.name} onChange={set("name")} required /></label>
        )}
        <label>Email<input type="email" value={form.email} onChange={set("email")} required /></label>
        <label>Password
          <input type="password" value={form.password} onChange={set("password")} minLength={6} required />
        </label>
        <button className="btn primary" disabled={loading}>
          {loading ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
        </button>
        <p className="muted center">
          {isSignup ? <>Have an account? <Link to="/login">Log in</Link></> : <>New here? <Link to="/signup">Sign up</Link></>}
        </p>
      </form>
    </main>
  );
}
