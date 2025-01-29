import React, { JSX } from 'react';
import DOMPurify from 'dompurify';

export function timeAgo(dateString: string): string {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  
    if (diffInSeconds < 60) {
      return "just now";
    }
  
    const intervals: { [key: string]: number } = {
      minute: 60,
      hour: 60 * 60,
      day: 60 * 60 * 24,
      week: 60 * 60 * 24 * 7,
      month: 60 * 60 * 24 * 30,
      quarter: 60 * 60 * 24 * 30 * 3,
      halfYear: 60 * 60 * 24 * 30 * 6,
      year: 60 * 60 * 24 * 365,
    };
  
    for (const [key, seconds] of Object.entries(intervals).reverse()) {
      const elapsed = Math.floor(diffInSeconds / seconds);
      if (elapsed > 0) {
        return elapsed === 1
          ? `1 ${key} ago`
          : `${elapsed} ${key}s ago`;
      }
    }
  
    return "just now";
  }
  



export const RenderHtml = (htmlContent: string): JSX.Element => {
  // Sanitize the HTML content using DOMPurify
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  // Return the HTML content wrapped in a div
  return <span dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};


export function calculatePercentage(length: number): number {
  if (length < 1) return 0; // Handle edge case for invalid lengths
  if (length > 3) return 100; // Cap at 100%

  return Math.round((length / 3) * 100);
}


export function getSubstring(input: string, length: number): string {
  if (length < 0) return ""; // Handle invalid length
  return input.slice(0, length)+"...";
}
