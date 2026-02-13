import Details from '../pages/Details'

function Sidebar() {
    return (
        <div className="bg-zinc-900 text-white w-1/4 p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>

            <div className="space-y-2">
                {/* Example items */}
                <div className="bg-zinc-800 px-4 py-2 rounded-lg flex justify-between">
                    <span>📄 document1.txt</span>
                    <span className="text-xs text-zinc-400">2 mins ago</span>
                </div>

                <div className="bg-zinc-800 px-4 py-2 rounded-lg flex justify-between">
                    <span>📄 notes.txt</span>
                    <span className="text-xs text-zinc-400">5 mins ago</span>
                </div>
            </div>

            <Details />
        </div>
    )
}

export default Sidebar
