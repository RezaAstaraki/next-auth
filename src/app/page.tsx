import Logo from "../components/general components/logo/Logo";
import { LogoIcon } from "../components/icons";

export default function HomePage() {

  return (
    <section className="flex  flex-1 items-center justify-center gap-4 py-8 md:py-10">
    <Logo className="flex flex-col " showTitle />
    </section>
  );
}
