import "./Card.css";

export default function MiniStatsCard(props) {
  return (
    <div class="Stat__Card">
      <div className="icon">{props.icon}</div>
      <div class="Stat__Container">
        <div class="Stat__Title">{props.title}</div>
        <div class="Stat__Content">{props.value}</div>
      </div>
    </div>
  );
}
