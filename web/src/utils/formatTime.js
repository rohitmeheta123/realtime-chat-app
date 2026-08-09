/**
 * Formats an ISO timestamp or Date object into a readable time string (e.g. "10:32 AM")
 * @param {string|Date} timestamp 
 * @returns {string}
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return '';

  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    return '';
  }
};
