import { useEffect, useState } from 'react';

export const useSVGIcon = (name: string) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const { default: iconSrc } = await import(`../../assets/tokens/${name}.svg`);
        setSrc(iconSrc);
      } catch {
        try {
          const { default: defaultSrc } = await import('../../assets/tokens/default.svg');
          setSrc(defaultSrc);
        } catch {
          setSrc(null);
        }
      }
    };

    loadIcon();
  }, [name]);

  return { src };
};
