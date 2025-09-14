import pkg from "@/package.json";
import Enamad from "../certificate componenets/enamad/Enamad";
import Eanjoman from "../certificate componenets/eanjoman/Eanjoman";
import Samandehi from "../certificate componenets/samandehi/Samandehi";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="w-full flex text-xs items-center justify-center py-3">
      {pkg.name}-version-{pkg.version}
      {/* <Enamad href="" src=""/>
      <Eanjoman href="" src="" />
      <Samandehi  href="" src=""/> */}
    </footer>
  );
}
