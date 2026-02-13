import { createContext, useContext, useEffect, useState } from "react";
import { handleFileUpload } from "../services/file.service";
import { apiHandler } from "../utils/apiHandler"

const UserContext = createContext(null)

export const useUser = () => useContext(UserContext)

export const UserContextProvider = ({ children }) => {
    const [file, setFile] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, seterror] = useState(null)

    const uploadFiles = async (selectedFiles) => {
        console.log("Selected:", selectedFiles)
        if (!selectedFiles?.length) return;

        const formData = new FormData();

        selectedFiles.forEach((f) => {
            formData.append("files", f);
        });

        const res = await apiHandler(
            () => handleFileUpload(formData),
            setLoading,
            seterror
        );

        console.log("uploaded:", res?.data);
        return res?.data?.data;
    };


    const values = {
        file,
        setFile,
        uploadFiles,
        loading,
        error
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}