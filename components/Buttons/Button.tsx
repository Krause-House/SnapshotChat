const buttonStyle: any = {
  blue: "bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  red: "bg-red-300 rounded-lg hover:bg-red-400 focus:ring-red-300 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-800",
  yellow:
    "text-yellow-900 bg-yellow-200 rounded-lg hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-800",
  purple:
    "text-purple-900 bg-purple-300 rounded-lg hover:bg-purple-400 focus:ring-purple-300 dark:bg-purple-200 dark:hover:bg-purple-300 dark:focus:ring-purple-200",
  orange:
    "text-orange-900 bg-orange-200 rounded-lg hover:bg-orange-300 focus:ring-orange-300 dark:bg-orange-200 dark:hover:bg-orange-300 dark:focus:ring-orange-200",
  hollow:
    "text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
};

interface Props {
  title: string;
  href?: string;
  onClick?: any;
  color?: string;
  icon?: boolean;
  newTab?: boolean;
  className?: string;
}

export const Button = ({
  title,
  onClick,
  href,
  icon = false,
  color = "blue",
  newTab = false,
  className = "",
}: Props) => (
  <a
    onClick={onClick}
    href={href}
    className={`inline-flex py-2 px-3 text-sm cursor-pointer font-medium text-center text-white focus:ring-4 ${buttonStyle[color]} ${className}`}
    target={newTab ? "_blank" : undefined}
    rel="noreferrer"
  >
    {title}
    {icon && (
      <svg
        className="ml-2 -mr-1 w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    )}
  </a>
);
