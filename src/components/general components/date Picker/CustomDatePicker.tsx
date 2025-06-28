'use client';
import arabic from 'react-date-object/calendars/arabic';
import gregorian from 'react-date-object/calendars/gregorian';
import indian from 'react-date-object/calendars/indian';
import jalali from 'react-date-object/calendars/jalali';
import julian from 'react-date-object/calendars/julian';
import persian from 'react-date-object/calendars/persian';
import persian_ar from 'react-date-object/locales/persian_ar';
import persian_en from 'react-date-object/locales/persian_en';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian_hi from 'react-date-object/locales/persian_hi';
import DatePicker, { DatePickerRef } from 'react-multi-date-picker';

// import {Locale} from "react-date-object/locales/persian_hi"
// import arabic_ar from "react-date-object/locales/arabic_ar"
// import arabic_ar from "react-date-object/locales/"
// import arabic_ar from "react-date-object/locales/arabic_ar"
// import arabic_ar from "react-date-object/locales/arabic_ar"
// import arabic_ar from "react-date-object/locales/arabic_ar"
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import './PersianDate.css';

type LocaleType = 'fa' | 'fa-IR' | 'fa-EN' | 'pr' | 'persian' | 'iran' | 'fa-AR' | 'fa-hi' | 'en';

const setLocale = (localeType?: LocaleType) => {
    switch (localeType) {
        case 'fa':
        case 'fa-IR':
        case 'persian':
        case 'iran':
            return persian_fa;
        case 'fa-EN':
            return persian_en;
        case 'fa-AR':
            return persian_ar;
        case 'fa-hi':
            return persian_hi;
        case 'en':
            return undefined;
        default:
            undefined;
    }
};

const setCalenderType = (calendarType?: 'persian' | 'arabic' | 'gregorian' | 'jalali' | 'julian' | 'indian') => {
    switch (calendarType) {
        case 'persian':
            return persian;
        case 'arabic':
            return arabic;
        case 'gregorian':
            return gregorian;
        case 'indian':
            return indian;
        case 'jalali':
            return jalali;
        case 'julian':
            return julian;
        default:
            undefined;
    }
};

interface CustomDatePickerProps {
    setValue: any;
    valueName: string;
    defaultValue?: string;
    useFormatter?: boolean;
    height?: number;
    setSateValue?: any;
    width?: number;
    placeHolder?: string;
    convertorFunction?: (date: Date | undefined) => string;
    format?: string;
    onlyMonthPicker?: boolean;
    onlyYearPicker?: boolean;
    locale?: LocaleType;
    className?: string;
    showOtherDays?: boolean;
    zIndex?: number;
    monthYearSeparator?: string;
    dateSeparator?: string;
    hStep?: number;
    mStep?: number;
    sStep?: number;
    timerFormat?: string;
    timerPosition?: string;
    timerHidden?: boolean;
    showSeconds?: boolean;
    timerTitle?: string;
    timePicker?: boolean;
    hideYear?: boolean;
    hideMonth?: boolean;
    calendar?: 'persian' | 'arabic' | 'gregorian' | 'jalali' | 'julian' | 'indian';
    rtl?: boolean;
}

export default function CustomDatePicker({
    setValue,
    monthYearSeparator,
    valueName,
    defaultValue,
    useFormatter,
    setSateValue,
    height = 56,
    width,
    placeHolder,
    convertorFunction,
    format,
    onlyMonthPicker,
    onlyYearPicker,
    locale,
    className,
    showOtherDays,
    hStep,
    mStep,
    sStep,
    timerFormat,
    timerPosition,
    timerHidden,
    showSeconds = false,
    timerTitle,
    calendar,
    hideYear,
    hideMonth,
    timePicker,
    rtl = false,
}: CustomDatePickerProps) {
    const plugins = timePicker
        ? [
              <TimePicker
                  key={1}
                  format={timerFormat}
                  position={timerPosition}
                  hStep={hStep}
                  mStep={mStep}
                  sStep={sStep}
                  hidden={timerHidden}
                  hideSeconds={!showSeconds}
                  title={timerTitle}
              />,
          ]
        : [];

    const [dateState, setDate] = useState(defaultValue ? new Date(defaultValue) : undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [dateValue, setDateValue] = useState<undefined | string>(defaultValue);
    const inputRef = useRef<DatePickerRef | null>(null);

    useEffect(() => {
        if (!dateValue || dateValue === '') {
            setIsOpen(false);
        }

        if (defaultValue) {
            setIsOpen(true);
        }
    }, [dateValue, defaultValue]);

    const getClearButtonText = () => {
        switch (locale) {
            case 'fa':
            case 'fa-IR':
            case 'persian':
            case 'iran':
                return <XIcon />;
            default:
                return <XIcon />;
        }
    };

    const clearDate = () => {
        setDate(undefined);
        setDateValue(undefined);
        setValue(valueName, undefined);
        inputRef.current?.closeCalendar();
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <DatePicker
                ref={inputRef}
                monthYearSeparator={monthYearSeparator}
                showOtherDays={showOtherDays}
                onlyMonthPicker={onlyMonthPicker}
                onlyYearPicker={onlyYearPicker}
                className={cn(className, 'p-2')}
                locale={setLocale(locale)}
                calendarPosition="top-center"
                fixMainPosition
                onOpen={() => {
                    setIsOpen(true);
                }}
                calendar={
                    locale && calendar
                        ? setCalenderType(calendar)
                        : locale && !calendar
                          ? setLocale(locale) === persian_fa
                              ? persian
                              : undefined
                          : calendar && !locale
                            ? setCalenderType(calendar)
                            : undefined
                }
                hideYear={hideYear}
                hideMonth={hideMonth}
                value={dateState}
                plugins={plugins}
                onChange={(date) => {
                    setDateValue(date?.toDate()?.toISOString());
                    if (date) {
                        setDate(date.toDate());
                    }
                    let v;
                    if (useFormatter) {
                        v = date?.format(format);
                    } else if (convertorFunction) {
                        v = convertorFunction(date?.toDate());
                    } else if (timePicker) {
                        v = date?.toDate().toISOString();
                    } else if (!timePicker) {
                        v = date?.toDate().toLocaleDateString('en-CA');
                    }
                    setValue(valueName, v);
                    setSateValue(v);
                }}
                id="custom-date-picker"
                format={format}
                style={{
                    height: `${height}px`,
                    width: '100%',
                    backgroundColor: '#f4f4f5',
                    direction: rtl ? 'rtl' : 'ltr',
                }}
            />
            <p
                className={`absolute bottom-0 top-0 m-auto h-fit ${
                    rtl ? 'ml-2' : 'mr-2'
                } select-none text-gray-500 transition-transform duration-300 ${
                    isOpen ? 'translate-y-[-20px] opacity-100' : 'translate-y-0 opacity-50'
                }`}
                style={{
                    fontSize: '14px',
                }}
                onClick={() => {
                    setIsOpen(true);
                    inputRef?.current?.openCalendar();
                }}
            >
                {placeHolder}
            </p>

            {dateValue && (
                <button
                    onClick={clearDate}
                    className={`px py absolute top-1/2 -translate-y-1/2 transform rounded text-sm text-gray-600 hover:bg-gray-300 ${
                        rtl ? 'left-2' : 'right-2'
                    }`}
                    style={{
                        direction: rtl ? 'rtl' : 'ltr',
                    }}
                >
                    {getClearButtonText()}
                </button>
            )}
        </div>
    );
}
