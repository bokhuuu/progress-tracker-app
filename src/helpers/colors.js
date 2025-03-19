export const getStatusColors = (status) => {
  const statusColors = {
    დასაწყები: "#F7BC30",
    პროგრესში: "#FB5607",
    "მზად ტესტირებისთვის": "#FF006E",
    დასრულებული: "#3A86FF",
  };
  return statusColors[status] || "";
};

export const getpPriorityColors = (priority) => {
  const priorityColors = {
    დაბალი: "border-[#08A508] text-[#08A508]",
    საშუალო: "border-[#FFBE0B] text-[#FFBE0B]",
    მაღალი: "border-[#FA4D4D] text-[#FA4D4D]",
  };
  return priorityColors[priority] || "";
};

export const getDepartmentColors = (department) => {
  const departmentColors = {
    "ადმინისტრაციის დეპარტამენტი": "bg-[#FF66A8]",
    "ადამიანური რესურსების დეპარტამენტი": "bg-[#FFD86D]",
    "ფინანსების დეპარტამენტი": "bg-[#89B6FF]",
    "გაყიდვები და მარკეტინგის დეპარტამენტი": "bg-[#FF66A8]",
    "ლოჯოსტიკის დეპარტამენტი": "bg-[#FD9A6A]",
    "ტექნოლოგიების დეპარტამენტი": "bg-[#89B6FF]",
    "მედიის დეპარტამენტი": "bg-[#FF66A8]",
  };
  return departmentColors[department] || "";
};
