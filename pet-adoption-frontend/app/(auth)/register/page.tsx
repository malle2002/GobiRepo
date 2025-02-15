"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState<{ name: string; email: string; password: string }>({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include",
            });

            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            router.push("/login?message=Registration-successful-you-can-login-now");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-10">
            <div className="relative card w-full max-w-md shadow-xl bg-base-100 p-8">
                
                <div className="absolute top-6 -right-14 card flex flex-col space-y-3 shadow-xl bg-base-100 h-auto p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 48 48" className="hover:opacity-70 cursor-pointer">
                        <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2aa4f4"></stop><stop offset="1" stopColor="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 48 48" className="hover:opacity-70 cursor-pointer">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-center text-primary">Sign Up</h1>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form className="space-y-6 mt-6" onSubmit={handleSubmit} > 
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg">Name</span>
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            value={formData.name || ""}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg">Email</span>
                        </div>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Enter your email" 
                            className="input input-bordered w-full" 
                            value={formData.email}
                            onChange={handleChange}
                            required />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg">Password</span>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <div className="text-right">
                        <a href="#" className="text-sm text-gray-500 hover:text-primary hover:underline">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full text-lg"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign up"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <a href="/login" className="text-primary font-medium hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}
