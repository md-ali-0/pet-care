import { useEffect, useRef, useState } from "react";

// Custom Hook to detect click outside the dropdown
const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);

  return domNode;
};

// Reusable Dropdown Component
export const Dropdown = ({
  buttonLabel,
  options,
  onOptionClick,
}: {
  buttonLabel: string;
  options: { label: string; href: string }[];
  onOptionClick?: (label: string) => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });

  const handleOptionClick = (label: string) => {
    if (onOptionClick) {
      onOptionClick(label);
    }
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div ref={domNode} className="relative inline-block mb-8 text-left">
      <button
        className={`flex items-center rounded-[5px] px-5 py-[13px] bg-dark dark:bg-dark-2 text-base font-medium`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {buttonLabel || ""}
      </button>
      <div
        className={`shadow-1 dark:shadow-box-dark absolute left-0 z-40 mt-2 w-full rounded-md bg-dark dark:bg-dark-2 py-[10px] transition-all ${
          dropdownOpen
            ? "top-full opacity-100 visible"
            : "top-[110%] invisible opacity-0"
        }`}
      >
        {options.map((option, index) => (
          <DropdownItem
            key={index}
            href={option.href}
            label={option.label}
            onClick={() => handleOptionClick(option.label)}
          />
        ))}
      </div>
    </div>
  );
};

// Dropdown Item Component
export const DropdownItem = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) => {
  return (
    <a
      className="block py-2 px-5 text-base text-dark-5 hover:text-white"
      href={href}
      onClick={onClick}
    >
      {label}
    </a>
  );
};
