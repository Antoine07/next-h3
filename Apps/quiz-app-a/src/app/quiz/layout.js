export default function QuizLayout({ children }) {
  return (
    <div className="stack">
      <div className="pill">Espace quiz</div>
      {children}
    </div>
  );
}
