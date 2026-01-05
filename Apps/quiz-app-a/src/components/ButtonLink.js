import Link from "next/link";

export default function ButtonLink({ href, label }) {
  return (
    <Link href={href}>
      <button>{label}</button>
    </Link>
  );
}
