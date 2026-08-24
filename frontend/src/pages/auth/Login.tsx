import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthLayout from '../../layouts/AuthLayout'
import { useAuth } from '../../contexts/AuthContext'
import { loginSchema, type LoginFormValues } from '../../schemas/auth.schema'

export default function Login(): JSX.Element {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loginError, setLoginError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoginError(null)
      await login(data.username, data.password)
      navigate('/dashboard')
    } catch (err: any) {
      setLoginError(err?.message || 'Login failed')
    }
  }

  return (
    <AuthLayout>
      <div className="mx-auto max-w-md">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">Secure access</p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[color:var(--text)]">Sign in</h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">Access your Vendora workspace and continue operations.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {loginError && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{loginError}</p>}
          <div>
            <label className="mb-2 block text-sm font-medium text-[color:var(--muted)]">Username</label>
            <input
              type="text"
              {...register('username')}
              className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-soft)] px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--primary)] focus:bg-[color:var(--panel)] focus:ring-4 focus:ring-[color:var(--primary-light)]"
              placeholder="your_username"
            />
            {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[color:var(--muted)]">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-soft)] px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--primary)] focus:bg-[color:var(--panel)] focus:ring-4 focus:ring-[color:var(--primary-light)]"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-sm text-slate-500">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-[color:var(--border)] text-[color:var(--primary)] focus:ring-[color:var(--primary)]" />
              Remember me
            </label>
            <Link to="/" className="font-medium text-[color:var(--primary)] hover:text-[color:var(--primary-dark)]">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full rounded-xl bg-[color:var(--primary)] px-4 py-3 font-semibold text-white shadow-soft transition hover:bg-[color:var(--primary-dark)]">
            Sign in
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}
