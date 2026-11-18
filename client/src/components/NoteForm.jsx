import { useState } from "react";

// Used for both create and edit; `note` is set when editing
export default function NoteForm({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSave({ title, content });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="overlay" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h2>{note ? "Edit note" : "New note"}</h2>
        {error && <p className="error">{error}</p>}
        <label>Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} autoFocus />
        </label>
        <label>Content
          <textarea rows={7} value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <div className="actions end">
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn primary" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
