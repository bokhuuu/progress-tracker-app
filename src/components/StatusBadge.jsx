const StatusBadge = ({ statusName }) => {
  const statusColors = {
    დასაწყები: "#F7BC30",
    პროგრესში: "#FB5607",
    "მზად ტესტირებისთვის": "#FF006E",
    დასრულებული: "#3A86FF",
  };

  const bgColor = statusColors[statusName] || "#6C757D";

  return (
    <div
      className="w-full h-[54px] rounded-[10px] py-[15px] text-white font-bold flex items-center justify-center mb-6"
      style={{ backgroundColor: bgColor }}
    >
      {statusName}
    </div>
  );
};

export default StatusBadge;
