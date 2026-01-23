import Link from "next/link";

export default function ButtonLink({ href, label }) {
  return (
    <Link className="button-link" href={href}>
      {label}
    </Link>
  );
}
