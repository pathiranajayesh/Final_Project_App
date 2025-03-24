import axiosInstance from "../auth/axiosInstance";

interface AuthResponse {
    accessToken: string;
}

// Login: Send email and password to the API and store the access token.
export const login = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/api/auth/login", { email, password });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
};

// Refresh token: The refresh token is sent automatically via cookies.
export const refreshAccessToken = async (): Promise<string> => {
    const response = await axiosInstance.post<AuthResponse>("/api/auth/refresh");
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data.accessToken;
};

// Logout: Clear the access token and notify the API to clear the refresh token.
export const logout = async (navigate: (path: string) => void): Promise<void> => {
    await axiosInstance.post("/api/auth/logout");
    localStorage.removeItem("accessToken");
    navigate("/login");
};