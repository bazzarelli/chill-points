type SvgProps = {
  [key: string]: any;
};

const CheckCompleteIcon = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M379.333-228.927 138.927-469.333l63.305-63.305 177.101 177.101 377.769-377.768L820.406-670 379.333-228.927Z" />
  </svg>
);

export default CheckCompleteIcon;
