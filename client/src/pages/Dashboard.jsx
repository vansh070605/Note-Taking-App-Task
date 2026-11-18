import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // null | "new" | note

  useEffect(() => {
    api("/notes")
      .then((d) => setNotes(d.notes))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const save = async (data) => {
    if (editing === "new") {
      const { note } = await api("/notes", { method: "POST", body: data });
      setNotes([note, ...notes]);
    } else {
      const { note } = await api(`/notes/${editing._id}`, { method: "PUT", body: data });
      setNotes(notes.map((n) => (n._id === note._id ? note : n)));
    }
    setEditing(null);
  };

  const remove = async (note) => {
    if (!window.confirm(`Delete "${note.title}"?`)) return;
    try {
      await api(`/notes/${note._id}`, { method: "DELETE" });
      setNotes(notes.filter((n) => n._id !== note._id));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <header className="topbar">
        <strong>📝 NoteNest</strong>
        <div className="actions">
          <span className="muted hide-sm">{user.name}</span>
          <button className="btn small" onClick={logout}>Log out</button>
        </div>
      </header>
      <main className="wrap">
        <div className="row">
          <h1>My notes</h1>
          <button className="btn primary" onClick={() => setEditing("new")}>+ New note</button>
        </div>
        {error && <p className="error">{error}</p>}
        {loading ? (
          <p className="muted">Loading notes…</p>
        ) : notes.length === 0 ? (
          <p className="muted empty">No notes yet. Create your first one!</p>
        ) : (
          <div className="grid">
            {notes.map((n) => (
              <NoteCard key={n._id} note={n} onEdit={setEditing} onDelete={remove} />
            ))}
          </div>
        )}
      </main>
      {editing && (
        <NoteForm note={editing === "new" ? null : editing} onSave={save} onCancel={() => setEditing(null)} />
      )}
    </>
  );
}
