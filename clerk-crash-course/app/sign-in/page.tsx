'use client'

import { useSignIn, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

const AuthLayout = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle?: React.ReactNode }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 sm:p-8 relative overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10 bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] border border-gray-800/60 overflow-hidden">
            <div className="p-8 sm:p-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 mb-6 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)] transform hover:scale-105 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-3">{title}</h1>
                    {subtitle && <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">{subtitle}</p>}
                </div>
                {children}
            </div>
        </div>
    </div>
);

export default function Page() {
    const { signIn, errors, fetchStatus } = useSignIn()
    const { signUp } = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [code, setCode] = React.useState('')
    const [verifying, setVerifying] = React.useState(false)
    const [showMissingRequirements, setShowMissingRequirements] = React.useState(false)

    // Helper to finalize sign-in and navigate
    const finalizeSignIn = async () => {
        await signIn.finalize({
            navigate: ({ session, decorateUrl }) => {
                if (session?.currentTask) {
                    // Handle pending session tasks
                    // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                    console.log(session?.currentTask)
                    return
                }

                const url = decorateUrl('/')
                console.log({ url })
                if (url.startsWith('http')) {
                    window.location.href = url
                } else {
                    router.push(url)
                }
            },
        })
    }

    // Helper to finalize sign-up and navigate
    const finalizeSignUp = async () => {
        await signUp.finalize({
            navigate: ({ session, decorateUrl }) => {
                if (session?.currentTask) {
                    // Handle pending session tasks
                    // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                    console.log(session?.currentTask)
                    return
                }

                const url = decorateUrl('/')
                if (url.startsWith('http')) {
                    window.location.href = url
                } else {
                    router.push(url)
                }
            },
        })
    }

    // Step 1: Start sign-in with signUpIfMissing and send email code
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Create sign-in for the signUpIfMissing flow.
        // The flow will proceed to verification regardless of whether an account exists or not.
        const { error: createError } = await signIn.create({
            identifier: emailAddress,
            signUpIfMissing: true,
        })
        if (createError) {
            console.error(JSON.stringify(createError, null, 2))
            return
        }

        // Start the verification step
        if (!createError) {
            const { error: sendError } = await signIn.emailCode.sendCode()
            if (sendError) {
                console.error(JSON.stringify(sendError, null, 2))
                return
            }

            setVerifying(true)
        }
    }

    // Step 2: Verification step
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()

        const { error } = await signIn.emailCode.verifyCode({ code })

        // When the user doesn't exist, verifyCode returns an error with
        // the code 'sign_up_if_missing_transfer'. Check for this error
        // to determine if we need to transfer to sign-up.
        if (error) {
            // @ts-ignore
            if (error.errors[0]?.code === 'sign_up_if_missing_transfer') {
                // The user doesn't exist - transfer to sign-up
                await handleTransfer()
                return
            }

            // Some other error occurred
            console.error(JSON.stringify(error, null, 2))
            return
        }

        // The user exists and verification succeeded
        if (signIn.status === 'complete') {
            await finalizeSignIn()
        } else {
            // Check why the sign-in is not complete
            console.error('Sign-in attempt not complete:', signIn.status)
        }
    }

    // Step 3: Transfer to sign-up
    const handleTransfer = async () => {
        // Create sign-up using transfer.
        // This moves the verified identification from the sign-in to a new sign-up.
        const { error } = await signUp.create({ transfer: true })
        if (error) {
            console.error(JSON.stringify(error, null, 2))
            return
        }

        if (signUp.status === 'complete') {
            // No additional requirements - sign-up is complete
            await finalizeSignUp()
        } else if (signUp.status === 'missing_requirements') {
            // Additional fields are required to complete sign-up.
            // Common missing fields include legal_accepted, first_name, last_name, etc.
            // Show a form to collect the missing fields.
            setShowMissingRequirements(true)
        } else {
            console.error('Unexpected sign-up status:', signUp.status)
        }
    }

    // Step 4: Submit missing requirements to complete sign-up
    const handleMissingRequirements = async (e: React.FormEvent) => {
        e.preventDefault()

        // This example handles legal acceptance as an example.
        // You can extend this to handle other missing fields like first_name, last_name, etc.
        // by checking signUp.missingFields and collecting the appropriate values.
        const { error } = await signUp.update({
            legalAccepted: true,
        })
        if (error) {
            console.error(JSON.stringify(error, null, 2))
            return
        }

        if (signUp.status === 'complete') {
            await finalizeSignUp()
        } else if (signUp.status === 'missing_requirements') {
            // Still missing other fields
            console.error('Additional fields still required:', signUp.missingFields)
        } else {
            console.error('Unexpected sign-up status:', signUp.status)
        }
    }

    // Step 4 UI: Show missing requirements form
    if (showMissingRequirements) {
        return (
            <AuthLayout
                title="Complete your account"
                subtitle="Your email has been verified. Please complete the following to create your account."
            >
                <form onSubmit={handleMissingRequirements} className="space-y-6">
                    {signUp.missingFields.includes('legal_accepted') && (
                        <div className="flex items-start bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                            <div className="flex items-center h-5 mt-0.5">
                                <input
                                    id="legal"
                                    type="checkbox"
                                    required
                                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-colors cursor-pointer"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="legal" className="font-medium text-gray-300 cursor-pointer">I agree to the Terms of Service and Privacy Policy</label>
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={fetchStatus === 'fetching'}
                        className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]"
                    >
                        {fetchStatus === 'fetching' ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Creating...
                            </span>
                        ) : 'Create account'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => signIn.reset()}
                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors focus:outline-none focus:underline"
                    >
                        Start over
                    </button>
                </div>
            </AuthLayout>
        )
    }

    // Step 2 UI: Show verification code form
    if (verifying) {
        return (
            <AuthLayout
                title="Verify your email"
                subtitle={
                    <>We sent a verification code to <strong className="text-white font-semibold">{emailAddress}</strong></>
                }
            >
                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-300">Verification code</label>
                        <input
                            id="code"
                            name="code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="block w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 text-center text-lg tracking-widest font-mono"
                            placeholder="Enter 6-digit code"
                            autoComplete="one-time-code"
                        />
                        {errors.fields.code && (
                            <p className="text-sm text-red-400 mt-2 flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                {errors.fields.code.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={fetchStatus === 'fetching'}
                        className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]"
                    >
                        {fetchStatus === 'fetching' ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Verifying...
                            </span>
                        ) : 'Verify Code'}
                    </button>
                </form>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <button
                        onClick={() => signIn.emailCode.sendCode()}
                        className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none focus:underline"
                    >
                        Resend verification code
                    </button>
                    <button
                        onClick={() => signIn.reset()}
                        className="text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors focus:outline-none focus:underline"
                    >
                        Back to sign in
                    </button>
                </div>
            </AuthLayout>
        )
    }

    // Step 1 UI: Show email input form
    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in or sign up to continue to your account"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className="block w-full rounded-xl border border-gray-700 bg-gray-800/50 pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>
                    {errors?.fields?.identifier && (
                        <p className="text-sm text-red-400 mt-2 flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            {errors.fields.identifier.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={fetchStatus === 'fetching'}
                    className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]"
                >
                    {fetchStatus === 'fetching' ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Continuing...
                        </span>
                    ) : 'Continue with Email'}
                </button>
            </form>

            {/* For your debugging purposes. You can just console.log errors, but we put them in the UI for convenience */}
            {errors && Object.keys(errors).length > 0 && (
                <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 overflow-auto">
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
                </div>
            )}

            {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default. */}
            <div id="clerk-captcha" className="mt-4" />
        </AuthLayout>
    )
}