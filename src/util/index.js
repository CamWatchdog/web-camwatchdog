import MonthEnum from './MonthEnum';
import Rules from './Rules';

export default {
  formatDate(date, type = 'extended') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = MonthEnum[d.getMonth() + 1];
    const monthNumber = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const hours = `${d.getHours()}`.padStart(2, '0');
    const minutes = `${d.getMinutes()}`.padStart(2, '0');

    if (type === 'short') return `${day}/${monthNumber}/${year}`;

    return `${day} de ${month} de ${year} ${hours}:${minutes}`;
  },
  copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  },
  MonthEnum,
  Rules,
};
