export const LoadingSpinner = () => (
    <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
);

export const ErrorMessage = ({ message }: { message: string }) => <div className="rounded-lg bg-red-50 p-4 text-center text-red-700">{message}</div>;

export const NoDataMessage = () => <div className="rounded-lg bg-gray-50 p-4 text-center text-gray-700">هیچ داده‌ای یافت نشد.</div>;
