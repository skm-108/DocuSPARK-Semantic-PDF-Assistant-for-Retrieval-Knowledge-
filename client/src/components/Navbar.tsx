import {Link} from 'react-router-dom'
import {FileText, Sparkles} from 'lucide-react'


export function Navbar(){

    return(
        <>
           <div className='fixed top-4 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4'>

            <div className='flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl'>

                <Link to='/' className='flex items-center gap-3 whitespace-nowrap'>
                    <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 shadow-lg shadow-cyan-500/30'>
                        <FileText className='h-6 w-6 text-white' />
                    </div>
                    <div className='leading-tight'>
                        <div className='flex items-center gap-2 text-lg font-extrabold tracking-tight sm:text-xl'>
                            DocuSPARK
                            <Sparkles className='h-4 w-4 text-cyan-300' />
                        </div>
                        <p className='text-xs text-slate-300'>AI document intelligence</p>
                    </div>
                </Link>

                <div className='hidden items-center gap-6 md:flex'>
                    <Link to={'/#features'} className='text-sm text-slate-200 transition-colors hover:text-cyan-300'>
                       <span>Features</span>
                    </Link>
                    <Link to={'/#app-section'} className='text-sm text-slate-200 transition-colors hover:text-cyan-300'>
                        <span>App</span>
                    </Link>
                    <Link to={'/#dashboard'} className='text-sm text-slate-200 transition-colors hover:text-cyan-300'>
                        <span>Dashboard</span>
                    </Link>
                </div>
            </div>
           </div>
        </>
    )
}