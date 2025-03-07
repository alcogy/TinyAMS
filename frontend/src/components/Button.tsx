interface Props {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function Button({ label, disabled = false, onClick }: Props) {
  return (
    <button
      className="bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-400"
      disabled={disabled}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
}
