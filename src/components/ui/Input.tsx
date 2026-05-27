import { RefObject } from "react";

// 1. Define an interface that matches exactly what the component receives
interface InputProps {
    placeholder: string;
    reference?: RefObject<HTMLInputElement>; // Matches 'reference' in SignIn.tsx
    type?: string; // Added to support "password", "text", etc.
}

export function Input({ placeholder, reference, type = "text" }: InputProps) {
    return (
        <div>
            <input 
                ref={reference}
                type={type} 
                placeholder={placeholder} 
                className="px-4 py-2 border rounded m-2 w-full" 
            />
        </div>
    );
}