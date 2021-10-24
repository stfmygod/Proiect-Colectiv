export function getToken() {
    try {
        const idToken = localStorage.getItem("token");
        return new Map({ idToken });
    } catch (err) {
        clearToken();
        return new Map();
    }
}

export function clearToken() {
    localStorage.removeItem("token");
}
