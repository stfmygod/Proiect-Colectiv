import axios from "axios";
import btoa from "btoa";
import { apiConfig } from "../../settings";
import Exception from "./exceptions/genericException";
import { getToken } from "./utils";

const buildQuery = (params) =>
    Object.keys(params)
        .reduce((a, k) => {
            a.push(k + "=" + encodeURIComponent(params[k]));
            return a;
        }, [])
        .join("&");

const getAuthHeader = () => {
    const token = getToken().get("idToken");

    if (!token)
        return {
            Authorization: "Basic " + btoa(apiConfig.appToken),
        };

    return {
        Authorization: "Basic " + btoa(token + ":"),
    };
};

const getDefaultHeaders = () => ({
    headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
    },
});

const addHeaders = (options) => ({
    ...getDefaultHeaders(),
    ...options,
});

const handleResponse = (response) => {
    if (response) {
        if (response.error) {
            throw new Exception(response.error, response.error_code);
        }
        return response;
    }
    console.error("There was a problem processing the request");
    throw new Exception("There was a problem processing the request");
};

const put = (url, data, config = {}) => {
    config = addHeaders(config);

    return axios.put(apiConfig.apiUrl + url, data, config).then((response) => handleResponse(response));
};

// TODO refactor and make this generic
const post = (url, data, config = {}) => {
    config = addHeaders(config);

    return axios.post(apiConfig.apiUrl + url, data, config).then((response) => handleResponse(response, true));
};

const get = (url, config = {}) => {
    let { query, ...restConfig } = config;

    config = addHeaders(restConfig);
    query = query ? buildQuery(query) : "";

    return axios.get(apiConfig.apiUrl + url + "?" + query, config).then((response) => handleResponse(response));
};

const remove = (url, config = {}) => {
    config = addHeaders(config);

    return axios.delete(apiConfig.apiUrl + url, config).then((response) => handleResponse(response));
};

const requestHalper = {
    put,
    post,
    get,
    remove,
    buildQuery,
};

export default requestHalper;
