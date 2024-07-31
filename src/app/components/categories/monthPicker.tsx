// src/components/MonthPicker.tsx
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MonthPickerProps {
  selectedMonth: Date;
  onChange: (date: Date | null, event?: React.SyntheticEvent) => void;
}

export default function MonthPicker({
  selectedMonth,
  onChange,
}: MonthPickerProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Month
      </label>
      <DatePicker
        selected={selectedMonth}
        onChange={onChange}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        className="inline-flex bg-white justify-between items-center w-full rounded-md border border-gray-300 dark:border-gray-500 dark:bg-gray-700 py-2 px-3 text-sm font-medium shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}
