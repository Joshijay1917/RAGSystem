import React from 'react'
import { useUser } from '../context/UserContext'

function Details({ file }) {
    const { loading, error } = useUser()

    return (
        <div className='py-2'>
            {file && (
                file.map((fil) => (
                    <div className="bg-zinc-800 px-4 py-2 rounded-lg flex justify-between">
                        📄 {fil.name}
                        {loading && <span>Uploading...</span>}
                        {error && <span>{error}</span>}
                    </div>
                ))
            )}
        </div>
    )
}

export default Details
