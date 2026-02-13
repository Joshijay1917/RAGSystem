export const apiHandler = async(apiCall, setLoading, setError) => {
    try {
        setLoading?.(true);
        setError?.('');

        const res = await apiCall();
        return res;
    } catch (err) {
        const message =
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong";

        setError?.(message);
        console.error("API Error:", err);
        return null;
    } finally {
        setLoading?.(false);
    }
}