export const formatDateOption1 = (date: Date | string): string => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }); // 04 / 10
  };
  
  export const formatDateOption2 = (date: Date | string): string => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' }); // 04 / Сен / 2019
  };

  export const formatDateOption3 = (date: Date | string): string => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }); // Returns format like 06/07/2023
  };