export default function StatusCard({ title, value, type }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className={type}>{value}</p>
    </div>
  );
}
