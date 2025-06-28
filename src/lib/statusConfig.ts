import { CheckCircle, Clock, XCircle } from 'lucide-react';

export const statusColorMap = {
    'در انتظار پرداخت': {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        icon: Clock,
        iconColor: 'text-yellow-500',
    },
    'پرداخت شده': {
        bg: 'bg-green-50',
        text: 'text-green-700',
        icon: CheckCircle,
        iconColor: 'text-green-500',
    },
    'کنسل شده': {
        bg: 'bg-red-50',
        text: 'text-red-700',
        icon: XCircle,
        iconColor: 'text-red-500',
    },
    'لغو شده': {
        bg: 'bg-red-50',
        text: 'text-red-700',
        icon: XCircle,
        iconColor: 'text-red-500',
    },
    Pending: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        icon: Clock,
        iconColor: 'text-blue-500',
    },
    Paid: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        icon: CheckCircle,
        iconColor: 'text-green-500',
    },
    Canceled: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        icon: XCircle,
        iconColor: 'text-red-500',
    },
};
