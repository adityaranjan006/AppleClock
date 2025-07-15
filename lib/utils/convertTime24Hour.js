"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTo24Hour = void 0;
const convertTo24Hour = (time12h) => {
    const modifier = time12h.toLowerCase().includes('am') ? 'am' : 'pm';
    const timeOnly = time12h.toLowerCase().replace(/(am|pm|\s)/g, '');
    let [hours, minutes] = timeOnly.split(':');
    let hoursInt = parseInt(hours, 10);
    if (hours === '12') {
        hoursInt = modifier === 'am' ? 0 : 12;
    }
    else if (modifier === 'pm') {
        hoursInt = hoursInt + 12;
    }
    // console.log(`${hoursInt.toString().padStart(2, '0')}:${minutes}`)
    return `${hoursInt.toString().padStart(2, '0')}:${minutes}`;
};
exports.convertTo24Hour = convertTo24Hour;
