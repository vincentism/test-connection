import Link from 'next/link'

export async function getStaticProps() {
  // 模拟构建时获取数据
  const data = {
    title: 'SSG 静态生成页面',
    buildTime: new Date().toISOString(),
    items: [
      { id: 1, name: '静态内容 1' },
      { id: 2, name: '静态内容 2' },
      { id: 3, name: '静态内容 3' },
    ],
  }

  return {
    props: {
      data,
    },
  }
}

interface SSGPageProps {
  data: {
    title: string
    buildTime: string
    items: { id: number; name: string }[]
  }
}

export default function SSGPage({ data }: SSGPageProps) {
  return (
    <div className="min-h-screen bg-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-green-600 hover:underline mb-6 inline-block">
          ← 返回首页
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            SSG
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">{data.title}</h1>
          <p className="text-gray-500 text-sm mb-6">
            构建时间: {new Date(data.buildTime).toLocaleString()}
          </p>

          <div className="space-y-3">
            {data.items.map((item) => (
              <div key={item.id} className="p-4 bg-green-100 rounded-lg">
                <span className="font-medium text-green-800">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Data URL 说明</h3>
            <p className="text-sm text-gray-600">
              客户端导航到此页面时，会请求预生成的 JSON 文件：
            </p>
            <code className="block mt-2 text-xs bg-gray-200 p-2 rounded">
              /_next/data/[buildId]/ssg.json
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
