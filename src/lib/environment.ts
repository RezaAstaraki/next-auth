import tavanaLogo from "../../public/logo.svg";
import tiktockLogo from "../../public/tiktok.png";
import tehronyadakiLogo from "../../public/tehronyadakilogo.png";

const site = process.env.NEXT_PUBLIC_SITE_NAME;

export const ADMIN_CLIENT_BASE_URL =
  site === "ir"
    ? "https://adminapi.tavanastore.ir"
    : site === "tiktock"
      ? "https://adminapi.ticktokwatch.com"
      : site === "tehronyadaki"
        ? "https://adminapi.tehronyadaki.com"
        : "";

export const ADMIN_SERVER_BASE_URL =
  site === "ir"
    ? "https://adminapi.tavanastore.ir"
    : site === "tiktock"
      ? "https://adminapi.ticktokwatch.com"
      : site === "tehronyadaki"
        ? "https://adminapi.tehronyadaki.com"
        : "";

export const HOST_DOMAIN_FILES_URL =
  site === "ir"
    ? "https://file.tavanastore.ir"
    : site === "local"
      ? "172.16.110.5:7100"
      : site === "server"
        ? "http://185.222.120.69:7100"
        : site === "tiktockip"
          ? "http://10.201.68.5:7100"
          : site === "tiktock"
            ? "https://file.ticktokwatch.com"
            : site === "tehronyadaki"
              ? "https://file.tehronyadaki.com"
              : site === "tiktockhttp"
                ? "http://file.ticktokwatch.com"
                : site === "docker"
                  ? "http://localhost:7100"
                  : "https://gwfile.tavanapay.ir";

export const NEXT_PUBLIC_HOST_DOMAIN_NAME =
  site === "ir"
    ? "file.tavanastore.ir"
    : site === "local"
      ? "172.16.110.5"
      : site === "server"
        ? "http://185.222.120.69:7080"
        : site === "tiktockip"
          ? "http://10.201.68.5:7080"
          : site === "tiktock"
            ? "https://file.ticktokwatch.com"
            : site === "tehronyadaki"
              ? "https://file.tehronyadaki.com"
              : site === "tiktockhttp"
                ? "http://file.ticktokwatch.com"
                : site === "docker"
                  ? "http://localhost:3000"
                  : "91.232.73.29";

// export const NEXT_PUBLIC_WEBSITE_TITLE =""
export const NEXT_PUBLIC_WEBSITE_TITLE =
  site === "ir"
    ? "توانا استور"
    : site === "tiktock"
      ? "تیک تاک واچ"
      : site === "tehronyadaki"
        ? "تهرون یدکی"
        : "";

// export const NEXT_PUBLIC_LOGO_ADRESS = logo1
export const NEXT_PUBLIC_FAV_ICON_ADRESS =
  site === "ir"
    ? "/favs/faviconTavana.ico"
    : site === "tiktock"
      ? "/favs/faviconTick.ico"
      : site === "tehronyadaki"
        ? "/favs/tehronyadakiFav.ico"
        : "";

export const NEXT_PUBLIC_LOGO_ADRESS =
  site === "ir"
    ? tavanaLogo
    : site === "tiktock"
      ? tiktockLogo
      : site === "tehronyadaki"
        ? tehronyadakiLogo
        : "";
export const NEXT_PUBLIC_HAS_MOBILEAPP = false;
export const NEXT_PUBLIC_COLOR = "#db9665";
export const NEXT_PUBLIC_USE_GET_WITH_INSTALLMENT =
  site === "ir"
    ? true
    : site === "tiktock"
      ? false
      : site === "tehronyadaki"
        ? false
        : false;
export const NEXT_PUBLIC_USE_BUY_CATEGORY_WRAP = false;
export const NEXT_PUBLIC_TOP_NAVBAR_COLOR = "#4741BC";
export const NEXT_PUBLIC_HAS_ADVATAGE = false;
export const NEXT_PUBLIC_SHOW_BRAND_IN_SEARCH_SIDEBAR = false;
export const NEXT_PUBLIC_EXTERNAL_LINKS = false;

const siteCertificate = "tiktock";
// const siteCertificate = "tehronyadak";

export const NEXT_PUBLIC_ENAMAD_SRC =
  siteCertificate === "tiktock"
    ? "https://trustseal.enamad.ir/logo.aspx?id=576104&amp;Code=c3DdqsgKr5THoIbThgpgGh02gYndObKc"
    : siteCertificate === "ir"
      ? "https://trustseal.enamad.ir/logo.aspx?id=576104&amp;Code=c3DdqsgKr5THoIbThgpgGh02gYndObKc"
      : siteCertificate === "tehronyadak"
        ? "https://trustseal.enamad.ir/logo.aspx?id=587448&Code=1KB2YacrmjteifuC1DJFpZZ9PBSCvXkr"
        : "";

export const NEXT_PUBLIC_ENAMAD_HREF =
  siteCertificate === "tiktock"
    ? "https://trustseal.enamad.ir/?id=576104&amp;Code=c3DdqsgKr5THoIbThgpgGh02gYndObKc"
    : siteCertificate === "tehronyadak"
      ? "https://trustseal.enamad.ir/?id=587448&Code=1KB2YacrmjteifuC1DJFpZZ9PBSCvXkr"
      : "";

// Smandehi stc
export const NEXT_PUBLIC_SAMANDEHI_SRC =
  siteCertificate === "tiktock"
    ? "https://logo.samandehi.ir/logo.aspx?id=377305&p=qftiyndtyndtqftilymaujyn"
    : siteCertificate === "tehronyadak"
      ? "https://logo.samandehi.ir/logo.aspx?id=378051&p=qftiyndtaqgwlymaujynnbpd"
      : "";
//href
export const NEXT_PUBLIC_SAMANDEHI_HREF =
  siteCertificate === "tiktock"
    ? "https://logo.samandehi.ir/Verify.aspx?id=377305&p=xlaojyoejyoexlaoobpddshw"
    : siteCertificate === "tehronyadak"
      ? "https://logo.samandehi.ir/Verify.aspx?id=378051&p=xlaojyoemcsiobpddshwrfth"
      : "";

// enjoman
export const NEXT_PUBLIC_EANJOMAN_SRC =
  siteCertificate === "tiktock"
    ? "https://eanjoman.ir/api/script?code=lSKIrr7BfopdWhxZro46drVnj"
    : siteCertificate === "tehronyadak"
      ? "https://eanjoman.ir/api/script?code=RLpbNytjHhCZ1XSOfG57Z9aGg"
      : "";
export const NEXT_PUBLIC_EANJOMAN_HREF =
  siteCertificate === "tiktock"
    ? "https://eanjoman.ir/member/lSKIrr7BfopdWhxZro46drVnj"
    : siteCertificate === "tehronyadak"
      ? "https://eanjoman.ir/member/RLpbNytjHhCZ1XSOfG57Z9aGg"
      : "";
