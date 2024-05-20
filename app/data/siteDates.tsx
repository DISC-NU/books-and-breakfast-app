export interface Date {
  dayOfWeek: string;
  date: string;
}

export interface DateArray {
  [key: string]: Date;
}

export const getNextThreeMonthsDates: () => DateArray = () => {
  const today = new Date();
  let currentMonth = today.getMonth() + 1;
  let currentYear = today.getFullYear();

  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const daysOfWeek: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const result: DateArray = {};

  for (let i = 0; i < 3; i++) {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    for (let j = 1; j <= daysInMonth; j++) {
      const currentDate = new Date(currentYear, currentMonth - 1, j);
      const dayOfWeek = daysOfWeek[currentDate.getDay()];
      const formattedDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(j).padStart(2, '0')}`;

      result[formattedDate] = { dayOfWeek, date: formattedDate };
    }

    // Move to the next month
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }

  return result;
};

export const nextThreeMonthsDates = getNextThreeMonthsDates();
console.log(nextThreeMonthsDates);
