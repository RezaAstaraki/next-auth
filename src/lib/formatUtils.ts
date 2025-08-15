export const formatToPersianNumber = (
  num: number | null | undefined
): string => {
  if (num === undefined || num === null) return "";
  // return new Intl.NumberFormat('fa-IR').format(num / 10);
  return (num / 10).toLocaleString("fa-IR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (e) {
    return dateString || "";
  }
};

export const formatSecondsToMinutes = (second: number) => {
  const minutes = Math.floor(second / 60);
  const remainingSeconds = second % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export function persianToEnglishDigits(input: string): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return input.replace(/[۰-۹]/g, (char) => {
    return englishNumbers[persianNumbers.indexOf(char)] ?? char;
  });
}

export function getSecondsDifferenceFromGMT(gmtTime: string): number {
  // Parse the provided GMT time string (e.g., "2024-10-21T12:00:00Z")
  const gmtDate = new Date(gmtTime);

  // Get the current local time
  const now = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = gmtDate.getTime() - now.getTime();

  // Convert milliseconds to seconds
  const differenceInSeconds = Math.floor(differenceInMs / 1000);

  return differenceInSeconds;
}

export function convertJsonValues(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertJsonValues(item));
  } else if (obj !== null && typeof obj === "object") {
    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = convertJsonValues(obj[key]);
      }
    }
    return result;
  } else if (typeof obj === "string") {
    if (obj === "true") {
      return true;
    } else if (obj === "false") {
      return false;
    } else if (!isNaN(Number(obj))) {
      return Number(obj);
    }
    return obj;
  }
  return obj;
}
