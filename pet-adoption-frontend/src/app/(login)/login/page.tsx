import { Suspense } from "react";
import AuthPage from "../AuthPage";
import PageLoader from "@/src/components/PageLoader";

export default function Login() {
    return (
        <Suspense fallback={<PageLoader/>}>
            <AuthPage mode='signin'/>
        </Suspense>
    )
}