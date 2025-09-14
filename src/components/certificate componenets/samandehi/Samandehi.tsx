
type Props = {
    className?: string;
    href: string;
    src: string;
}

export default function Samandehi({href,src,className}: Props) {
  return (
   <div className={className}>
        <a referrerPolicy='origin' target='_blank'
            href={href}

        >
            <img
                referrerPolicy='origin'
                src={src}
                data-src=""
                alt="نماد اعتماد الکترونیکی"
                style={
                    {
                        "cursor": "pointer",
                        "border": 0,
                        maxWidth: "100%",
                        height: "auto"
                    }
                }

            />
        </a>
    </div>
  )
}