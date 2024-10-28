import { IBarber } from "../../../models/IBarber";

export const filterBarbers = (barbers: IBarber[], selectedOptions: { [key: string]: boolean }, searchQuery: string): IBarber[] => {
    return barbers.filter((barber) => {
        const matchesServices = Object.keys(selectedOptions).every(service => selectedOptions[service]);
        const matchesSearch = barber.username.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesServices && matchesSearch;
    });
};