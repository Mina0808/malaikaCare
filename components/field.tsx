export function Field({
  label,
  name,
  children,
}: {
  label: string;
  name?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label htmlFor={name} className="block text-xl font-medium">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
