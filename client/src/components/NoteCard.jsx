export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article className="card">
      <h3>{note.title}</h3>
      <p className="content">{note.content}</p>
      <div className="card-foot">
        <span className="muted">{new Date(note.updatedAt).toLocaleDateString()}</span>
        <div className="actions">
          <button className="btn small" onClick={() => onEdit(note)}>Edit</button>
          <button className="btn small danger" onClick={() => onDelete(note)}>Delete</button>
        </div>
      </div>
    </article>
  );
}
