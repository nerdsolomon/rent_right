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
        className="px-3 py-2 text-sm text-gray-500 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">By {label}</option>
        {list.map((item) => (
          <option className="capitalize" key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
