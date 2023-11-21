import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateColorFromAddress(address: any) {
  // Perform some logic to generate a color based on the address
  // For instance, converting the address to a hash and extracting RGB values
  const hashCode = hashString(address); // Some hash function to generate a numeric value

  // Extract RGB values from the hash code (example logic)
  const red = (hashCode & 0xff0000) >> 16;
  const green = (hashCode & 0x00ff00) >> 8;
  const blue = hashCode & 0x0000ff;

  // Return a CSS color string
  return `rgb(${red}, ${green}, ${blue})`;
}

function hashString(str: any) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
}
