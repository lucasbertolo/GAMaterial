import { format } from 'date-fns-tz';

export const buildDisplayTime = (date = new Date(), showSeconds = false) => {
    try {
        if (showSeconds) {
            return format(new Date(date), 'HH:mm:ss');
        }

        if (date instanceof Date) {
            const formattedTime = format(new Date(date), 'HH:mm');
            return formattedTime;
        }

        return '';
    } catch (err) {
        return '';
    }
};

export const buildSaveDateTime = (
    date = new Date(),
    formatDate = 'dd/MM/yyyy HH:mm'
) => {
    try {
        const formattedTime = format(new Date(date), formatDate);
        return formattedTime;
    } catch (error) {
        return '';
    }
};
