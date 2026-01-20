/**
 * 边缘函数: 学习进度管理接口
 * 路径: /api/progress
 * 功能: 保存和获取用户的学习进度
 */

export default async function handler(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }

  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId') || 'anonymous'

    if (request.method === 'GET') {
      // 获取学习进度
      // 这里使用模拟数据，实际应该从 KV 存储读取
      const progress = {
        userId,
        endocytosis: Math.floor(Math.random() * 100),
        exocytosis: Math.floor(Math.random() * 100),
        lastUpdated: new Date().toISOString()
      }

      return new Response(JSON.stringify(progress), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (request.method === 'POST') {
      // 保存学习进度
      const body = await request.json()
      const { process, progress } = body

      // 这里应该保存到 KV 存储
      // await env.KV_NAMESPACE.put(`progress:${userId}:${process}`, progress.toString())

      return new Response(JSON.stringify({
        success: true,
        userId,
        process,
        progress,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}
