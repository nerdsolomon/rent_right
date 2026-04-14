interface SelectInputProps {
  label: string;
  value: string;
  list: string[];
  onChange: (value: string) => void;
}

export const SelectInput = ({ label, value, list, onChange }: SelectInputProps) => {
  return (
    <div className="flex flex-col">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 text-sm text-gray-500 border-b border-gray-300 font-semibold focus:outline-none capitalize focus:ring-1 focus:ring-purple-500"
      >
        <option value="">{label}</option>
        {list.map((item) => (
          <option className="capitalize" key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
