// pages/isr/tutorial/index.js
import React from 'react';

// 这个函数在构建时和运行时都会执行
export async function getStaticProps() {
  // 模拟从API获取教程数据
  const res = await fetch(`http://playvideo.vodplayvideo.net/getplayinfo/v4/1306264703/243791576943072647?psign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMwNjI2NDcwMywiZmlsZUlkIjoiMjQzNzkxNTc2OTQzMDcyNjQ3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY3MDQ2OTk3MSwiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJQcm90ZWN0ZWRBZGFwdGl2ZSIsImRybUFkYXB0aXZlSW5mbyI6eyJwcml2YXRlRW5jcnlwdGlvbkRlZmluaXRpb24iOjEyfX0sInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTMwNjI2NDcwMy52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.FOcmChHfrGY9tYCDn20MSQi-IqvQ9U_U6qLNgx9MhLg&cipheredOverlayKey=3519690ca80be6a27f0bd21d87b64b081b43769a7298f19a017a36a7173850bef262ddf3d1725c0a544d3186a079f489c31c41d9f004a523d22587c69b1c4aa1ee832d583afa9eb2ad08d5d871d54b185601f6217ce8ee8ca2d9e88d47c102a7f8cce1e07f74793a1b1edf2ef20b4f6c195467fd54afa2cb6560b6223c2b3afb&cipheredOverlayIv=181ef82265cee43d4b4fae5cf84c0b2f6606cde26e8c29f4ce55851102f29d8b87bb701ae18336d2749a901c554d186cbf9908f40b695cba5140f116dbbfeb7cb4da74f909df2607ddf1b65bb0120fc91bbe095e77df9da4850df0b96fe400e1e4b2e62321ac2005765832784d5f8b4beba2405095263e50b2d90ce5f15db6ae&keyId=1`);
  const post = await res.json();

  // 为教程页面添加特定数据
  const tutorialData = {
    ...post,
    title: post.title || '实用教程指南',
    type: 'tutorial',
    category: '学习教程',
    author: '资深讲师',
    publishDate: new Date().toISOString(),
    difficulty: '中级',
    duration: '45分钟',
    steps: ['步骤1', '步骤2', '步骤3', '步骤4']
  };

  console.log('tutorial post', tutorialData);

  return {
    props: {
      post: tutorialData
    },
    // 启用ISR，设置重新验证时间为1小时（教程内容相对稳定）
    revalidate: 3600 // 单位：秒
  };
}

const TutorialPage = ({ post }) => {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <span className="post-type tutorial">教程</span>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>讲师: {post.author}</span>
          <span>分类: {post.category}</span>
          <span>难度: {post.difficulty}</span>
          <span>时长: {post.duration}</span>
          <span>requestId: {post.requestId}</span>
        </div>
      </div>
      
      <div className="post-content">
        <p>这是一个详细的实用教程，包含完整的步骤指导和实践操作。</p>
        <div className="tutorial-steps">
          <h3>教程步骤：</h3>
          <ol>
            {post.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        {post.content && <p>{post.content}</p>}
      </div>

      <style jsx>{`
        .post-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .post-header {
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }
        .post-type.tutorial {
          background: #28a745;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        h1 {
          font-size: 2.5rem;
          margin: 1rem 0;
          color: #333;
        }
        .post-meta {
          display: flex;
          gap: 1rem;
          color: #666;
          font-size: 0.9rem;
          flex-wrap: wrap;
        }
        .post-meta span {
          background: #f8f9fa;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }
        .post-content {
          line-height: 1.8;
          font-size: 1.1rem;
          color: #444;
        }
        .post-content p {
          margin-bottom: 1rem;
        }
        .tutorial-steps {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1.5rem 0;
        }
        .tutorial-steps h3 {
          margin-top: 0;
          color: #333;
        }
        .tutorial-steps ol {
          margin: 0;
          padding-left: 1.5rem;
        }
        .tutorial-steps li {
          margin-bottom: 0.5rem;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default TutorialPage; 