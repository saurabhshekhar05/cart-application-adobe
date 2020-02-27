import { siteConfig } from '../config/config';

export const apiService = {
    getCall
};
async function getCall(parameter: string, methodName: string, data?: any) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: data !== null ? JSON.stringify({ data }) : null,
    };
    const response =  parameter === '' ? await fetch(siteConfig.apiURL + methodName, requestOptions)
        : await fetch(siteConfig.apiURL + methodName + "?" + parameter + "= " + data);
    const userData = await handleResponse(response);
    return userData;
}

function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                 
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
