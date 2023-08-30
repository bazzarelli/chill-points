type SvgProps = {
  [key: string]: any;
};

const NavArrowBackIcon = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="m312.812-435.927 229.826 229.826L480-144.173 144.173-480 480-816.204l62.638 62.305-229.826 229.826h503.392v88.146H312.812Z" />
  </svg>
);

export default NavArrowBackIcon;
