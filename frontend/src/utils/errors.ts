export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error

  if (error && typeof error === 'object') {
    const record = error as Record<string, unknown>
    if (typeof record.message === 'string') return record.message
    if (Array.isArray(record.errors) && record.errors.length > 0) {
      const first = record.errors[0]
      if (typeof first === 'string') return first
      if (first && typeof first === 'object' && typeof (first as Record<string, unknown>).detail === 'string') {
        return (first as Record<string, unknown>).detail as string
      }
    }
  }

  return 'Something went wrong. Please try again.'
}
