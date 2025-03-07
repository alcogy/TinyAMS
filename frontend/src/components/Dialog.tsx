interface Props {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}

export default function Dialog({ children, title, onClose }: Props) {
  return (
    <div className="fixed bg-black bg-opacity-70 w-full h-full top-0 left-0 z-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        {title && <p className="font-bold text-lg">{title}</p>}
        {children}
        <div className="mt-3 text-right">
          <button className="text-blue-500" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
