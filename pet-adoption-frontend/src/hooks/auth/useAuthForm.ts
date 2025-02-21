"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useAuthForm({ type }: AuthFormProps) {
    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string, password?: string, error?: string }>({});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        if (type === "login") {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setErrors({
                    error: "Failed to sign in. Check your credentials",
                    email: errors.email,
                    password: errors.password
                });
                
            } else {
                router.push("/"); 
            }
            console.log(errors);
        } else {
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
                        Accept: "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Registration failed");
                }

                router.push("/login?message=Registration-successful-you-can-login-now");
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setErrors({ error: err.message, email: errors.email, password: errors.password });
                }
            }
        }

        setLoading(false);
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        loading,
        errors,
    };
}
