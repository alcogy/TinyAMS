interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <header className="flex justify-between h-14 px-5 items-center bg-sky-600">
        <div>
          <h1 className="text-white text-xl font-bold">
            Attendance Management
          </h1>
        </div>
        <div>
          <p className="text-white text-xs text-right">Admin</p>
        </div>
      </header>
      <main className="flex justify-center mt-8">{children}</main>
    </>
  );
}
