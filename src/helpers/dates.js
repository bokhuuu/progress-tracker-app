export const formatDate = (due_date) => {
  const months = [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ];
  const date = new Date(due_date);
  const day = date.getDate();
  const month = months[date.getMonth()].substring(0, 3);
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const formatDateWithDayAbbr = (due_date) => {
  const days = [
    "კვირა",
    "ორშაბათი",
    "სამშაბათი",
    "ოთხშაბათი",
    "ხუთშაბათი",
    "პარასკევი",
    "შაბათი",
  ];

  const date = new Date(due_date);
  const dayOfWeek = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${dayOfWeek.substring(0, 3)} - ${day}/${month}/${year}`;
};
