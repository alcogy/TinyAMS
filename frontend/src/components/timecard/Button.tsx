interface Props {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function Button({ label, disabled = false, onClick }: Props) {
  return (
    <button
      className="text-3xl border py-5 w-48 rounded-md bg-blue-500 text-white hover:bg-blue-400 disabled:bg-gray-500 disabled:text-gray-300"
      disabled={disabled}
      onClick={onClick}
    >
      {label}  
    </button>
  );
}