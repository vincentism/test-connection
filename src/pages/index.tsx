import Link from 'next/link'

const renderModes = [
  {
    title: 'SSR (Server-Side Rendering)',
    description: '每次请求时在服务端渲染，会请求 _next/data/*.json',
    path: '/ssr',
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    title: 'SSG (Static Site Generation)',
    description: '构建时生成静态页面，客户端导航时请求 _next/data/*.json',
    path: '/ssg',
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    title: 'ISR (Incremental Static Regeneration)',
    description: '静态生成 + 按需重新验证，会请求 _next/data/*.json',
    path: '/isr/article',
    color: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    title: 'SSG 动态路由',
    description: '带动态参数的静态生成页面',
    path: '/test/vvv1',
    color: 'bg-orange-500 hover:bg-orange-600',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Next.js Pages Router 渲染模式测试
        </h1>
        <p className="text-center text-gray-600 mb-8">
          点击下方按钮测试不同渲染模式的 data URL 请求情况
        </p>
        <p className="text-center text-gray-500 text-sm mb-12">
          打开浏览器开发者工具 Network 面板，筛选 <code className="bg-gray-200 px-2 py-1 rounded">_next/data</code> 查看 JSON 请求
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {renderModes.map((mode) => (
            <Link
              key={mode.path}
              href={mode.path}
              className={`block p-6 rounded-lg text-white transition-all transform hover:scale-105 ${mode.color}`}
            >
              <h2 className="text-xl font-semibold mb-2">{mode.title}</h2>
              <p className="text-white/90 text-sm">{mode.description}</p>
              <p className="mt-3 text-white/70 text-xs font-mono">{mode.path}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Data URL 说明</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• <strong>SSR:</strong> 每次客户端导航都会请求 <code className="bg-gray-100 px-1">/_next/data/[buildId]/ssr.json</code></li>
            <li>• <strong>SSG:</strong> 客户端导航时请求预生成的 <code className="bg-gray-100 px-1">/_next/data/[buildId]/ssg.json</code></li>
            <li>• <strong>ISR:</strong> 类似 SSG，但服务端会在 revalidate 时间后重新生成</li>
            <li>• <strong>动态路由:</strong> 请求 <code className="bg-gray-100 px-1">/_next/data/[buildId]/test/[id].json</code></li>
          </ul>
        </div>
      </div>
    </main>
  )
}
