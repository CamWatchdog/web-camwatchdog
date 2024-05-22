import MonthEnum from './MonthEnum';
import Rules from './Rules';

export default {
  formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = MonthEnum[d.getMonth() + 1];
    const day = `${d.getDate()}`.padStart(2, '0');
    const hours = `${d.getHours()}`.padStart(2, '0');
    const minutes = `${d.getMinutes()}`.padStart(2, '0');

    return `${day} de ${month} de ${year} ${hours}:${minutes}`;
  },
  MonthEnum,
  Rules,
};
