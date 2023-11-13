type SvgProps = {
  [key: string]: any;
};

const LogoType = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={184}
    height={30}
    fill="none"
    {...props}
  >
    <path d="M13.06 29.38c-3.37 0-6.346-1.419-8.93-4.256-2.584-2.837-3.876-6.13-3.876-9.88 0-3.977 1.178-7.233 3.534-9.766 2.381-2.533 5.409-3.8 9.082-3.8 2.787 0 5.206.798 7.258 2.394 2.077 1.57 3.116 3.116 3.116 4.636 0 .507-.152.912-.456 1.216-.279.279-.684.418-1.216.418-.507 0-.975-.24-1.406-.722a15.571 15.571 0 0 1-1.216-1.786 19.744 19.744 0 0 0-1.406-2.052c-.507-.71-1.241-1.305-2.204-1.786-.937-.507-2.052-.76-3.344-.76-2.28 0-4.243.95-5.89 2.85-1.621 1.9-2.432 4.32-2.432 7.258 0 3.724 1.026 6.827 3.078 9.31 2.077 2.457 4.497 3.686 7.258 3.686 2.052 0 3.775-.62 5.168-1.862a11.812 11.812 0 0 0 3.192-4.446c.228-.405.545-.557.95-.456.405.101.557.418.456.95-.456 2.457-1.621 4.547-3.496 6.27-1.85 1.723-4.256 2.584-7.22 2.584Zm30.96-3.116c.05.507.291.937.722 1.292.43.355.646.633.646.836v.152c0 .304-.253.456-.76.456h-4.56c-.507 0-.76-.152-.76-.456v-.152c0-.177.114-.355.342-.532.253-.177.494-.38.722-.608.228-.253.33-.57.304-.95l-.38-7.752c-.101-2.179-.57-3.838-1.406-4.978-.836-1.14-1.925-1.71-3.268-1.71-1.393 0-2.533.494-3.42 1.482s-1.33 2.242-1.33 3.762v9.234c0 .481.253.9.76 1.254.507.33.76.595.76.798v.114c0 .33-.266.494-.798.494h-4.75c-.481 0-.722-.165-.722-.494v-.114c0-.203.228-.469.684-.798.481-.355.722-.773.722-1.254V4.87c0-.43-.127-.773-.38-1.026a2.826 2.826 0 0 0-.722-.646c-.228-.177-.342-.342-.342-.494V2.59c0-.279.177-.494.532-.646L29.732.576c.33-.152.595-.177.798-.076.203.076.304.266.304.57l-.076 12.312c1.292-2.001 3.18-3.002 5.662-3.002 1.976 0 3.623.697 4.94 2.09 1.343 1.368 2.09 3.42 2.242 6.156l.418 7.638ZM50.912 7.15c-.786 0-1.406-.215-1.862-.646-.456-.43-.684-1-.684-1.71s.228-1.28.684-1.71c.48-.456 1.102-.684 1.862-.684.734 0 1.33.228 1.786.684.456.43.684 1 .684 1.71s-.228 1.28-.684 1.71c-.456.43-1.052.646-1.786.646ZM48.708 29c-.482 0-.722-.165-.722-.494v-.152c0-.177.114-.342.342-.494.228-.177.456-.38.684-.608.228-.253.342-.57.342-.95V14.978c0-.583-.228-1.09-.684-1.52-.456-.43-.684-.71-.684-.836v-.076c0-.177.19-.367.57-.57l2.926-1.444c.405-.152.696-.177.874-.076.202.101.304.304.304.608v15.238c0 .304.076.57.228.798.152.203.329.355.532.456.202.101.38.228.532.38.152.127.228.266.228.418v.152c0 .33-.266.494-.798.494h-4.674Zm9.05 0c-.482 0-.722-.165-.722-.494v-.114c0-.203.215-.469.646-.798.456-.355.684-.773.684-1.254V4.984c0-.43-.114-.785-.342-1.064a3.037 3.037 0 0 0-.646-.722c-.228-.177-.342-.342-.342-.494v-.076c0-.203.177-.405.532-.608L60.532.576c.38-.152.671-.165.874-.038.203.101.304.291.304.57V26.34c0 .481.24.9.722 1.254.506.33.76.595.76.798v.114c0 .33-.254.494-.76.494h-4.674Zm8.98 0c-.481 0-.722-.165-.722-.494v-.114c0-.203.216-.469.646-.798.456-.355.684-.773.684-1.254V4.984c0-.43-.114-.785-.342-1.064a3.037 3.037 0 0 0-.646-.722c-.228-.177-.342-.342-.342-.494v-.076c0-.203.178-.405.532-.608L69.512.576c.38-.152.672-.165.874-.038.203.101.304.291.304.57V26.34c0 .481.24.9.722 1.254.507.33.76.595.76.798v.114c0 .33-.253.494-.76.494h-4.674Zm16.49 0c-.532 0-.798-.165-.798-.494v-.076c0-.152.228-.405.684-.76.481-.38.722-.823.722-1.33V4.68c0-.456-.24-.874-.722-1.254-.456-.38-.684-.659-.684-.836v-.114c0-.304.266-.456.798-.456h7.068c1.647 0 3.167.165 4.56.494 1.393.33 2.647.836 3.762 1.52a7.174 7.174 0 0 1 2.66 2.774c.659 1.14.988 2.47.988 3.99 0 2.888-.975 5.117-2.926 6.688-1.95 1.57-4.674 2.356-8.17 2.356h-3.914v6.498c0 .507.24.95.722 1.33.507.355.76.608.76.76v.076c0 .33-.253.494-.76.494h-4.75Zm5.396-10.716h2.546c2.33 0 4.167-.583 5.51-1.748 1.368-1.19 2.052-2.825 2.052-4.902 0-2.61-.823-4.598-2.47-5.966-1.621-1.393-3.61-2.09-5.966-2.09h-2.052c-.659 0-.988.405-.988 1.216v12.122c0 .912.456 1.368 1.368 1.368Zm23.844 11.096c-2.939 0-5.333-.95-7.182-2.85-1.824-1.925-2.736-4.23-2.736-6.916 0-2.635.886-4.826 2.66-6.574 1.773-1.773 3.964-2.66 6.574-2.66 2.812 0 5.117.937 6.916 2.812 1.824 1.85 2.736 4.13 2.736 6.84 0 2.66-.836 4.89-2.508 6.688-1.672 1.773-3.826 2.66-6.46 2.66Zm.456-1.254c1.494 0 2.723-.633 3.686-1.9.988-1.267 1.482-2.951 1.482-5.054 0-2.685-.634-4.94-1.9-6.764-1.267-1.85-2.863-2.774-4.788-2.774-1.622 0-2.939.633-3.952 1.9-1.014 1.241-1.52 2.913-1.52 5.016 0 2.533.658 4.763 1.976 6.688 1.317 1.925 2.989 2.888 5.016 2.888ZM127.342 7.15c-.785 0-1.406-.215-1.862-.646-.456-.43-.684-1-.684-1.71s.228-1.28.684-1.71c.481-.456 1.102-.684 1.862-.684.735 0 1.33.228 1.786.684.456.43.684 1 .684 1.71s-.228 1.28-.684 1.71c-.456.43-1.051.646-1.786.646ZM125.138 29c-.481 0-.722-.165-.722-.494v-.152c0-.177.114-.342.342-.494.228-.177.456-.38.684-.608.228-.253.342-.57.342-.95V14.978c0-.583-.228-1.09-.684-1.52-.456-.43-.684-.71-.684-.836v-.076c0-.177.19-.367.57-.57l2.926-1.444c.405-.152.697-.177.874-.076.203.101.304.304.304.608v15.238c0 .304.076.57.228.798.152.203.329.355.532.456.203.101.38.228.532.38.152.127.228.266.228.418v.152c0 .33-.266.494-.798.494h-4.674Zm26.416-2.736c.026.405.152.735.38.988s.444.469.646.646c.228.152.342.317.342.494v.152c0 .33-.266.494-.798.494h-4.522c-.532 0-.798-.165-.798-.494v-.152c0-.177.228-.443.684-.798.482-.355.71-.785.684-1.292l-.38-7.6c-.101-2.255-.57-3.952-1.406-5.092-.81-1.165-1.9-1.748-3.268-1.748-1.393 0-2.533.494-3.42 1.482-.886.988-1.33 2.242-1.33 3.762v9.234c0 .304.076.57.228.798.178.203.355.355.532.456.178.101.342.228.494.38.178.127.266.266.266.418v.152c0 .33-.266.494-.798.494h-4.75c-.506 0-.76-.165-.76-.494v-.152c0-.203.241-.469.722-.798.507-.33.76-.747.76-1.254V14.826c0-.481-.139-.849-.418-1.102a3.076 3.076 0 0 0-.798-.646c-.253-.152-.38-.317-.38-.494v-.114c0-.228.203-.418.608-.57l2.85-1.368c.355-.177.621-.203.798-.076.178.127.266.342.266.646v2.774a6.435 6.435 0 0 1 2.394-2.546c1.064-.633 2.242-.95 3.534-.95 1.976 0 3.623.697 4.94 2.09 1.343 1.393 2.103 3.496 2.28 6.308l.418 7.486Zm10.238 3.116c-1.52 0-2.724-.481-3.61-1.444-.862-.988-1.292-2.42-1.292-4.294V12.28h-2.508c-.38 0-.57-.19-.57-.57v-.38c0-.38.19-.57.57-.57h1.368c1.722 0 2.685-1.203 2.888-3.61.05-.507.266-.76.646-.76h.38c.405 0 .608.253.608.76l.038 3.61h5.244c.152 0 .278.063.38.19a.47.47 0 0 1 .19.38v.38c0 .38-.19.57-.57.57h-5.244v11.4c0 1.013.215 1.799.646 2.356.43.557 1.013.836 1.748.836.81 0 1.456-.203 1.938-.608.506-.43.798-.988.874-1.672.126-.304.342-.43.646-.38.329.025.494.203.494.532 0 1.241-.456 2.33-1.368 3.268-.887.912-2.052 1.368-3.496 1.368Zm14.191-.038c-2.331 0-4.206-.469-5.624-1.406-1.394-.937-2.09-1.913-2.09-2.926 0-.937.494-1.406 1.482-1.406.43 0 .772.165 1.026.494.278.304.519.684.722 1.14.202.456.443.912.722 1.368.304.456.772.849 1.406 1.178.633.304 1.418.456 2.356.456 1.266 0 2.305-.291 3.116-.874.81-.608 1.216-1.431 1.216-2.47 0-1.013-.406-1.799-1.216-2.356-.786-.557-1.748-.95-2.888-1.178a83.903 83.903 0 0 1-3.42-.836 6.384 6.384 0 0 1-2.926-1.672c-.786-.81-1.178-1.9-1.178-3.268 0-1.47.671-2.698 2.014-3.686 1.342-1.013 3.052-1.52 5.13-1.52 2.204 0 3.99.469 5.358 1.406 1.368.937 2.052 1.963 2.052 3.078 0 .38-.14.697-.418.95a1.29 1.29 0 0 1-.95.38c-.456 0-.849-.24-1.178-.722a7.898 7.898 0 0 1-.836-1.596c-.203-.583-.634-1.115-1.292-1.596-.659-.481-1.52-.722-2.584-.722-1.115 0-2.052.317-2.812.95-.735.633-1.102 1.419-1.102 2.356 0 .988.392 1.76 1.178 2.318.81.532 1.786.925 2.926 1.178 1.14.253 2.267.532 3.382.836a6.003 6.003 0 0 1 2.888 1.71c.81.81 1.216 1.913 1.216 3.306 0 1.47-.71 2.698-2.128 3.686-1.394.963-3.243 1.444-5.548 1.444Z" />
  </svg>
);

export default LogoType;
