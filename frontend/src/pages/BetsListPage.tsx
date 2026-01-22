import { Link } from "react-router-dom";

export default function BetsListPage() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Bets</h2>
      <p>
        <Link to="/bets/new">+ New bet</Link>
      </p>

      <p style={{ opacity: 0.8 }}>
        Next step: render the list using <code>GET /bets</code>
      </p>
    </div>
  );
}
