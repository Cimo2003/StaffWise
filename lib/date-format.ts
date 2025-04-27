// Import the required functions from date-fns
import { parse, format } from 'date-fns';
import { Semester } from './types';


export function formatDateWithOrdinal(dateString: string) {
  // Parse the input date string
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  console.log(parsedDate)
  
  // Format the date with day, full month name and year
  let formattedDate = format(parsedDate, 'd MMMM yyyy');
  
  // Add the ordinal suffix (st, nd, rd, th) to the day
  const day = parsedDate.getDate();
  let suffix = 'th';
  
  if (day % 10 === 1 && day !== 11) {
    suffix = 'st';
  } else if (day % 10 === 2 && day !== 12) {
    suffix = 'nd';
  } else if (day % 10 === 3 && day !== 13) {
    suffix = 'rd';
  }
  
  // Replace the day number with day number + suffix
  formattedDate = formattedDate.replace(/^\d+/, day + suffix);
  
  return formattedDate;
}

export function yearCycle(semester: Semester){
    if(semester.number===1){
        const parsedDate = parse(semester.semesterStart, 'yyyy-MM-dd', new Date());
        return `1st Semester ${parsedDate.getFullYear()}/${parsedDate.getFullYear()+11}`
    }
    else{
        const parsedDate = parse(semester.semesterEnd, 'yyyy-MM-dd', new Date());
        return `2nd Semester ${parsedDate.getFullYear()-1}/${parsedDate.getFullYear()}`
    }
}