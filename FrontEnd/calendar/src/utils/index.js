export function getToken() {
    try {
        const idToken = localStorage.getItem("user");
        return new Map({ idToken });
    } catch (err) {
        clearToken();
        return new Map();
    }
}

export function clearToken() {
    localStorage.removeItem("user");
    localStorage.removeItem("selectedGroup");
}
