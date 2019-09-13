export const getValidationQuery = (response) => {
    return (dispatch, getState) => {
        const parseQueryString = (string) => {
            return string.slice(1).split('&')
                .map((queryParam) => {
                    let kvp = queryParam.split('=');
                    return {key: kvp[0], value: kvp[1]}
                })
                .reduce((query, kvp) => {
                    query[kvp.key] = kvp.value;
                    return query
                }, {})
        };
        const queryParams = parseQueryString(window.location.search);
        const hashParams = parseQueryString(window.location.hash);
        dispatch({ type: "GET_VK_QUERY", query: queryParams, hash: hashParams });
    }
};