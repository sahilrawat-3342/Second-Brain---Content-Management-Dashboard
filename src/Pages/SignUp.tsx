import { useRef, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { API_SIGNUP_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit() {
        const name = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!name || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            setIsLoading(true);
            await axios.post(API_SIGNUP_URL, {  
                name,
                password
            });
            alert("You have successfully signed up!");
            navigate("/signin");
        } catch (error: any) {
            console.error("Signup failed:", error);
            alert(error.response?.data?.message || "An error occurred during sign up.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex justify-center items-center p-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 w-full max-w-md p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Create Account</h1>
                    <p className="text-gray-500">Join SecondBrain and organize your world</p>
                </div>

                <div className="space-y-5">
                    <Input placeholder="Username" reference={usernameRef} />
                    <Input placeholder="Password" reference={passwordRef} type="password" />
                </div>

                <div className="mt-8">
                    <Button 
                        variant="primary" 
                        size="md" 
                        text="Sign Up" 
                        fullWidth={true} 
                        loading={isLoading} 
                        onClick={handleSubmit} 
                    />
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <span 
                            className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700 transition-colors"
                            onClick={() => navigate("/signin")}
                        >
                            Sign In
                        </span>
                    </p>
                </div>
            </div> 
        </div>
    );
}