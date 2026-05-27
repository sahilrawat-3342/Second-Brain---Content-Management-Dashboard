import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { API_LOGIN_URL } from "../config";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
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
            const response = await axios.post(API_LOGIN_URL, {
                name,
                password
            }, {
                withCredentials: true 
            });

            const jwt = response.data.token;
            
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
            
        } catch (error: any) {
            console.error("Login failed:", error);
            alert(error.response?.data?.message || "An error occurred during sign in.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex justify-center items-center p-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 w-full max-w-md p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to access your SecondBrain</p>
                </div>

                <div className="space-y-5">
                    <Input placeholder="Username" reference={usernameRef} />
                    <Input placeholder="Password" reference={passwordRef} type="password" />
                </div>

                <div className="mt-8">
                    <Button 
                        variant="primary" 
                        size="md" 
                        text="Sign In" 
                        fullWidth={true} 
                        loading={isLoading} 
                        onClick={handleSubmit} 
                    />
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{" "}
                        <span 
                            className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700 transition-colors"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div> 
        </div>
    );
}