// export default function About() {

//   return <div>test old version<div>2234</div></div>
// }

import { GetStaticPaths, GetStaticProps } from 'next'



// 定义静态生成路径
export const getStaticPaths = async () => {
  // 这里可以获取所有可能的id值
  // 例如从API、数据库或文件系统中获取
  const ids = ['vvv1', 'vvv2', 'vvv3'] // 示例数据
  
  return {
    paths: ids.map(id => ({
      params: { id }
    })),
    fallback: false // 或 'blocking' 根据需要
  }
}

// 获取静态props
export const getStaticProps = async (context) => {
  const { id } = context.params
  
  return {
    props: {
      id,
      name: 'John Doe' // 可以在这里获取数据
    }
  }
}

// 页面组件
export default function HelloPage({ id, name }) {
  return (
    <div>
      <h1>Hello {name}</h1>
      <p>Your ID is: {id}</p>
    </div>
  )
}