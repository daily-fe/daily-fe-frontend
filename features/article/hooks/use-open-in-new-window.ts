import { useCallback } from 'react';

export function useOpenInNewWindow(url: string | undefined | null) {
  return useCallback(() => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [url]);
}
