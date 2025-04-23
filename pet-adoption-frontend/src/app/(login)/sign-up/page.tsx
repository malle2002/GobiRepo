import { Suspense } from "react";
import AuthPage from "../AuthPage";

export default function Register() {
    return (
        <Suspense>
            <AuthPage mode='signup' />
        </Suspense>
    );
}