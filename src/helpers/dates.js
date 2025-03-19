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
