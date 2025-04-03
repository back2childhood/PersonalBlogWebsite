import React, { useEffect, useState } from "react";
import { getToken } from "@/utils/token";
import { Navigate } from "react-router-dom";

import { ReactNode } from "react";
import { getProfileAPI } from "@/utils/apis/getUser";

export function AuthRoute({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = getToken();
            console.log(token)
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await getProfileAPI();
                // console.log(response);
                // console.log(response.data)
                if (response.data?.username) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // Show a loading screen while checking authentication
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}   