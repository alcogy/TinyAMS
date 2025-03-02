interface Props {
  value: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "password";
  onChange: (v: any) => void;
}

export default function Textbox({
  value,
  label = "",
  placeholder = "",
  disabled = false,
  type = "text",
  onChange,
}: Props) {
  return (
    <div className="flex-1 w-full">
      {label && (
        <label className="block text-xs text-gray-600 mb-1">{label}</label>
      )}
      <input
        type={type}
        className="border border-gray-400 w-full px-2 py-1 rounded-md"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
