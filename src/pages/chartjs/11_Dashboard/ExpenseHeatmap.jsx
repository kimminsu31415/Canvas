import PropTypes from "prop-types";

const ExpenseHeatmap = ({ data }) => {
  const getColor = (amount) => {
    const maxAmount = Math.max(...data.map((d) => d.amount));
    const intensity = amount / maxAmount;
    return `rgba(74, 222, 128, ${intensity})`;
  };

  const daysInMonth = new Date(2024, 1, 0).getDate(); // Assume data is for January 2024
  const startDay = new Date(2024, 0, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.

  const weeks = Math.ceil((daysInMonth + startDay) / 7);

  return (
    <div
      className="expense-heatmap"
      style={{ display: "flex", flexDirection: "column", gap: "2px" }}
    >
      {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
        <div
          key={day}
          style={{ display: "flex", alignItems: "center", gap: "2px" }}
        >
          <div
            style={{
              width: "20px",
              fontSize: "12px",
              textAlign: "right",
              marginRight: "4px",
            }}
          >
            {day}
          </div>
          {[...Array(weeks)].map((_, weekIndex) => {
            const dayOfMonth = weekIndex * 7 + index - startDay + 1;
            const dayData = data.find((d) => d.day === dayOfMonth);
            return (
              <div
                key={weekIndex}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor:
                    dayOfMonth > 0 && dayOfMonth <= daysInMonth
                      ? getColor(dayData?.amount || 0)
                      : "transparent",
                  border: "1px solid #eee",
                  borderRadius: "2px",
                }}
                title={
                  dayData
                    ? `${dayOfMonth}일: ${dayData.amount.toLocaleString()}원`
                    : ""
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

ExpenseHeatmap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ExpenseHeatmap;
