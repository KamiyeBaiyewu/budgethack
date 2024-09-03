import { endOfDay, startOfDay } from 'date-fns';

export const minDate = () => {
    return startOfDay(new Date(1960, 1)).toISOString();
};

export const maxDate = () => {
    return endOfDay(new Date()).toISOString();
};
