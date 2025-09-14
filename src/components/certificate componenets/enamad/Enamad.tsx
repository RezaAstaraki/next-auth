
type Props = {
    href: string;
    src: string;
    className?: string;
}

export default function Enamad({
    href,
    src,
    className 
}: Props) {
  return (
     <div className={className} >
        <a referrerPolicy="origin" target="_blank" href={href}>
            <img referrerPolicy='origin' 
            src={src}
            style={{"cursor":"pointer" }}
                alt='enamd'
                className='cursor-pointer w-[93px] h-[102px]'
/>
        </a>
    </div>
  )
}