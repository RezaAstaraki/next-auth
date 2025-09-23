
import VersionSaver from "../general components/version-saver/VersionSaver";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <VersionSaver   className=""/>
      {/* <Enamad href="" src=""/>
      <Eanjoman href="" src="" />
      <Samandehi  href="" src=""/> */}
    </footer>
  );
}
