interface Props {
  value: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "password";
  onChange: (v: any) => void;
  onBlur?: (v: any) => void;
}

export default function Textbox({
  value,
  label = "",
  placeholder = "",
  disabled = false,
  type = "text",
  onChange,
  onBlur,
}: Props) {
  return (
    <div className="flex-1 w-full">
      {label && (
        <label className="block text-xs text-gray-600 font-bold mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className="border border-gray-400 w-full p-2 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur && onBlur(e.target.value)}
      />
    </div>
  );
}
