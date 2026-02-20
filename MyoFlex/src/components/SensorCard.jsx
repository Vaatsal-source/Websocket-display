export default function SensorCard({ label, value }) {
  return (
    <div className="sensor">
      <h4>{label}</h4>
      <span>{value}</span>
    </div>
  );
}
