type Props = {
    href: string;
    src: string;
    className?: string;
}

export default function Eanjoman({
    href,
    src,
    className
}: Props) {
    return (
        <div className={className}>
            <a referrerPolicy="origin" target="_blank" href={href}>
                <img 
                    referrerPolicy='origin'
                    src={src}
                    alt="انجمن صنفی کارفرمایی فروشگاه های اینترنتی شهر تهران"
                    title="انجمن صنفی کارفرمایی فروشگاه های اینترنتی شهر تهران"
                    className='cursor-pointer w-[93px] h-[102px]'
                />
            </a>
        </div>
    )
}