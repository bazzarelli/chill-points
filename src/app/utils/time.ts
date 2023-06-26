/**
 * 
 * @returns current time
 * 
 * @description
 * This function returns the current time in the format of HH:MM AM/PM
 * 
 */
function displayCurrentTime(): string {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = ampm === 'pm' ? hours - 12 : hours;

    return `${hours}:${minutes} ${ampm}`
}

export { displayCurrentTime };