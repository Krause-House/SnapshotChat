import kh_holo from "../../public/kh_holo.png";
import kh_logo from "../../public/kh_logo2.png";
import Image from "next/image";
import Link from "next/link";

export const HeaderLogo = () => (
  <Link href="/" passHref>
    <Image
      src={kh_logo}
      width={150}
      height={50}
      alt="KH_LOGO"
      className="hover:opacity-75 cursor-pointer"
    />
  </Link>
);
