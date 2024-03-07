export type IconType = 'outlined' | 'solid';
export type IconProps = {
  type?: IconType;
  className?: string;
};
export type IconComponent = (props: IconProps) => JSX.Element;
