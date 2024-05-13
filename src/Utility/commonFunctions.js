export const charValidate = (text, limit) => {
    if (text.length > limit) return `${text.substring(0, limit-3)}...`
    else return `${text.substring(0, limit)}`
}

// export function formatJsonString(jsonString) {
//   // const jsonString = '{"company origin":"South Korea"}';

//   try {
//     // Parse the JSON string
//     const parsedObject = JSON.parse(jsonString);
  
//     // Extract the key and value from the parsed object
//     const key = Object.keys(parsedObject)[0];
//     const value = parsedObject[key];
  
//     // Format the string
//     const formattedString = `${key}: ${value}`;
  
//     console.log(formattedString);
//     return formattedString
//   } catch (error) {
//     console.error('Error parsing JSON:', error);
//   }
  
// }
