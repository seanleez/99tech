import { useSVGIcon } from './svg-icon.hook';

export const SVGIcon: React.FC<{ name: string }> = ({ name }) => {
  const { src } = useSVGIcon(name);

  return src ? <img src={src} alt={name} /> : null;
};
