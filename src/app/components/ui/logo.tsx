import Link from "next/link";
import LogoIcon from "src/app/assets/icons/logo-icon";

export default function Logo() {
  return (
    <Link className="block relative" href="/">
      <LogoIcon className="size-14" />
      <span className="absolute text-xs text-transparent">home</span>
    </Link>
  );
}
