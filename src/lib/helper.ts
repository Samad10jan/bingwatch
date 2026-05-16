/**
 * Safely fetch data from an endpoint with error handling
 * @deprecated Use jikanAPI from @/lib/api instead for better error handling and caching
 */
export const fetchSafe = async (url: string) => {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.error(`[fetchSafe] HTTP ${res.status} from ${url}`);
      return [];
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(`[fetchSafe] Error fetching ${url}:`, error);
    return [];
  }
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

/**
 * Get image URL with fallback
 */
export const getImageUrl = (
  primaryUrl: string | undefined | null,
  fallbackUrl: string | undefined | null,
  defaultUrl = '/OIP.png'
): string => {
  return primaryUrl || fallbackUrl || defaultUrl;
};