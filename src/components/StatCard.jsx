import {
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";

function StatCard({ icon: Icon, title, value, changeText }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${title.toLowerCase().split(" ")[0]}`}>
        <Icon />
      </div>
      <div className="stat-content">
        <h3>{title}</h3>

        <div className="stat-change positive">
          <div className="stat-value">{value}</div>
          <div className="stat-change-info">
            <FaArrowUp />
            <span>{changeText}</span>
            <p>from last week</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StatCards() {
  return (
    <section className="stats-cards">
      <StatCard
        icon={FaDollarSign}
        title="Total Revenue"
        value="$847,293"
        changeText="5.1%"
      />
      <StatCard
        icon={FaShoppingCart}
        title="Orders"
        value="$2,847"
        changeText="8.2% "
      />
      <StatCard
        icon={FaUsers}
        title="Customers"
        value="12,483"
        changeText="7.3%"
      />
    </section>
  );
}
