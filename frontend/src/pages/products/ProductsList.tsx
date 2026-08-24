import React from 'react'
import { useQuery } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { api } from '../../services/api'

type Product = {
  id: number
  name: string
  sku?: string
  price: number | string
  inventory?: number
  created_at?: string
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products/')
  return response.data
}

export default function ProductsList() {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Inventory</p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-900">Products</h1>
          </div>
          <Button type="button">Add product</Button>
        </div>

        <Card>
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading products...</p>
          ) : isError ? (
            <p className="text-sm text-red-600">Unable to load products from the backend.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">SKU</th>
                    <th className="px-4 py-3 font-semibold">Inventory</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product) => (
                    <tr key={product.id} className="border-t border-slate-200 bg-white">
                      <td className="px-4 py-3 font-medium text-slate-800">{product.name}</td>
                      <td className="px-4 py-3 text-slate-600">{product.sku || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{product.inventory ?? 0} units</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">KSh {Number(product.price || 0).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <Badge tone={(product.inventory ?? 0) > 0 ? 'success' : 'warning'}>
                          {(product.inventory ?? 0) > 0 ? 'In stock' : 'Low stock'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  )
}
