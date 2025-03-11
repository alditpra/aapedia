/**
 * Calculate the estimated reading time for a given text
 * @param text The text content to analyze
 * @param wordsPerMinute The average reading speed (default: 200 words per minute)
 * @param codeReadingFactor The factor to reduce code reading speed (default: 0.3)
 * @returns An object with minutes, seconds and the formatted reading time string
 */
export function getReadingTime(text: string, wordsPerMinute: number = 200, codeReadingFactor: number = 0.3) {
  // Strip HTML tags if present
  const plainText = text.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Identify code blocks (markdown code blocks with ``` or indented code)
  const codeBlockRegex = /```[\s\S]*?```|`[^`]+`|\n( {4}|\t)[^\n]+/g;
  const codeBlocks = plainText.match(codeBlockRegex) || [];
  
  // Calculate code content and non-code content
  let codeContent = '';
  codeBlocks.forEach(block => {
    codeContent += block;
  });
  
  // Remove code blocks from text to count regular text separately
  let nonCodeContent = plainText;
  codeBlocks.forEach(block => {
    nonCodeContent = nonCodeContent.replace(block, '');
  });
  
  // Count words in regular text
  const regularWords = nonCodeContent.trim().split(/\s+/).filter(Boolean).length;
  
  // Count words in code (code takes longer to read)
  const codeWords = codeContent.trim().split(/\s+/).filter(Boolean).length;
  
  // Apply different reading speeds to regular text and code
  // Code is read more slowly than regular text
  const adjustedCodeWords = codeWords / codeReadingFactor;
  
  // Calculate total adjusted word count
  const totalAdjustedWords = regularWords + adjustedCodeWords;
  
  // Calculate reading time in minutes and seconds
  const minutes = Math.floor(totalAdjustedWords / wordsPerMinute);
  const seconds = Math.floor((totalAdjustedWords % wordsPerMinute) / (wordsPerMinute / 60));
  
  // Format the reading time
  let readingTime = '';
  if (minutes > 0) {
    readingTime = `${minutes} min`;
    if (seconds > 0) readingTime += ` ${seconds} sec`;
  } else {
    readingTime = `${seconds} sec`;
  }
  
  return {
    minutes,
    seconds,
    text: readingTime
  };
}
