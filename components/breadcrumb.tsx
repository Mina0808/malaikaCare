import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export function Breadcrumb({
  parents,
  current,
}: {
  parents: { link: string; label: React.ReactNode }[];
  current: string;
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {parents.map(({ link, label }, index) => (
          <li key={index}>
            <div className="flex items-center">
              <Link href={link} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Go to </span>
                {label}
              </Link>
              <ChevronRightIcon
                className="flex-shrink-0 h-5 w-5 text-gray-300"
                aria-hidden="true"
              />
            </div>
          </li>
        ))}
        <li className="text-xl">
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
