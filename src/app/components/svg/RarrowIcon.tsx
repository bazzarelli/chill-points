type SvgProps = {
  [key: string]: any;
};

const RarrowIcon = (props: SvgProps) => (
  <svg
    width={20}
    height={20}
    fill="#64748B"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M321-61.912 231.912-151l329-329-329-329L321-898.088 739.088-480 321-61.912Z" />
  </svg>
);

export default RarrowIcon;
