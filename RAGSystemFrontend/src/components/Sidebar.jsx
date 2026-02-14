import { useNavigate } from 'react-router-dom'
import Details from '../pages/Details'
import HomeInfo from './HomeInfo'
import { useUser } from '../context/UserContext'
import { useEffect } from 'react'
import Loader from "./Loader"

function Sidebar() {
    const navigate = useNavigate()
    const { filesUploaded, file, loading } = useUser()

    useEffect(() => {
        filesUploaded()
    }, [])
    

    return (
        <div className="bg-zinc-900 text-white w-1/4 p-6 border border-zinc-800">
            <button onClick={() => navigate('/status')} className='bg-blue-600 w-full rounded-lg my-2 py-2'>See Status</button>
            <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>

            {loading && <Loader />}

            <div className="space-y-2">
                {file && (
                    <Details file={file}/>
                )}
            </div>
            
            <HomeInfo />
        </div>
    )
}

export default Sidebar
