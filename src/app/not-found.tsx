import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-col justify-center items-center bg-slate-300 p-24 rounded-3xl text-3xl'>
            <h2>Page was Not Found</h2>
            <Link href="/" className='underline text-blue-700'>Return Home</Link>
        </div>
    )
}