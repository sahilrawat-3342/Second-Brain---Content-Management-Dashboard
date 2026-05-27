import { ReactElement } from "react";


export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string | ReactElement;
  startIcon?: ReactElement;
  endIcon?:   ReactElement; 
  onClick: () => void;
  fullWidth?: boolean;  
  loading?: boolean;
}

const sizeStyles = {
	"sm" : "py-1 px-2",
	"md" : "p-2 px-4",
	"lg" : "py-4 px-6"
}

const defaultStyle = "rounded-md flex items-center justify-center transition-colors duration-150 ease-in-out";


const variantStyles = {
	"primary": "bg-purple-600 text-white",
	"secondary": "bg-purple-300 text-purple-600 ",
}

export const Button = (props: ButtonProps) => {
 
  return <button 
  	className={`${variantStyles[props.variant]} ${defaultStyle} ${sizeStyles[props.size]} ${props.fullWidth ? "w-full" : ""} ${props.loading ? "cursor-wait opacity-50" : ""}`}
 	onClick={props.onClick}>
	{props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{props.text}
	</button>;
};

