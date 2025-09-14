
import { ChevronLeft } from 'lucide-react'
import { NotFoundIcon } from '../../icons'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center pb-[56px]">
            <div>
                <NotFoundIcon/>
            </div>
            <div className="text-center pt-[108px] text-gray-60">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                    صفحه‌ای که میخواستی اینجا نیست!
                </h1>
                <p className="pb-9 pt-6 text-gray-86">
                    برای پیدا کردن مسیر درست میتونی سری به صفحه اول بزنی.
                </p>

                <a href="/" className="inline-flex items-center gap-2 text-blue-link">
                    برگشت به صفحه اصلی
                    <ChevronLeft size={16} />
                </a>
            </div>
        </div>
    )
}