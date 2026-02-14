import { Link } from 'react-router-dom'

export default function HomeInfo() {
    return (
        <div className=" text-white flex py-10 items-center justify-center">
            <div className="max-w-3xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl space-y-6">

                <h1 className="text-3xl font-bold text-center">🧠 Private Knowledge Q&A</h1>

                <div className="space-y-4 text-zinc-300">

                    <div className="flex gap-3">
                        <span className="text-indigo-400 font-bold">1.</span>
                        <p>Upload one or more text documents.</p>
                    </div>

                    <div className="flex gap-3">
                        <span className="text-indigo-400 font-bold">2.</span>
                        <p>Ask a question about your documents.</p>
                    </div>

                    <div className="flex gap-3">
                        <span className="text-indigo-400 font-bold">3.</span>
                        <p>The AI searches your files and generates an answer.</p>
                    </div>

                    <div className="flex gap-3">
                        <span className="text-indigo-400 font-bold">4.</span>
                        <p>You can see exactly which document and text was used.</p>
                    </div>

                </div>

                <Link to={'/'} className="text-center w-full pt-4">
                        Try Now →
                </Link>

            </div>
        </div>
    );
}