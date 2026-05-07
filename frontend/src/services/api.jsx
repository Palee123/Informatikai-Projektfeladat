const API_URL = "https://localhost:7200/api";

export async function apiFetch(
    endpoint,
    options = {}
) {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };

    if (user?.usertoken) {

        headers.Authorization =
            `Bearer ${user.usertoken}`;
    }

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    return response;
}