import Link from "next/link";
import LogoIcon from "src/app/assets/icons/logo-icon";

export default function Logo() {
  return (
    <Link className="block" href="/">
      <LogoIcon className="size-14" />
    </Link>
  );
}
