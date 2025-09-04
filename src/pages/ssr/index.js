// pages/products/[id].js
import React from 'react';

// 这个函数在服务器端运行，用于获取数据
export async function getServerSideProps(context) {

  // console.log('context', context.params);
  // 从URL参数中获取产品ID
  // const { id } = context.params;
  
  const id = 1234
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // 这里应该是实际的API调用，我们使用模拟数据
  const product = {
    id,
    name: `产品 ${id}`,
    description: `这是产品 ${id} 的详细描述。这是一个高质量的产品，具有许多出色的功能。`,
    price: Math.floor(Math.random() * 100) + 50,
    stock: Math.floor(Math.random() * 100),
    createdAt: new Date().toISOString()
  };

  // 返回的数据将作为props传递给页面组件
  return {
    props: {
      product
    }
  };
}

// 页面组件
const ProductDetail = ({ product }) => {
  return (
    <div className="container">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      
      <div className="product-details">
        <p><strong>价格:</strong> ¥{product.price}</p>
        <p><strong>库存:</strong> {product.stock}件</p>
        <p><strong>上架时间:</strong> {new Date(product.createdAt).toLocaleString()}</p>
      </div>

      <button className="add-to-cart">加入购物车</button>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #333;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .product-details {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .add-to-cart {
          background: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .add-to-cart:hover {
          background: #0366d6;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;