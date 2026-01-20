/**
 * 边缘函数: 统计数据接口
 * 路径: /api/stats
 * 功能: 获取全局统计数据（访问量、学习人数等）
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
    if (request.method === 'GET') {
      // 获取统计数据
      // 这里使用模拟数据，实际应该从 KV 存储读取
      const stats = {
        totalVisits: Math.floor(Math.random() * 10000) + 1000,
        totalLearners: Math.floor(Math.random() * 5000) + 500,
        averageProgress: Math.floor(Math.random() * 100),
        popularProcess: Math.random() > 0.5 ? 'endocytosis' : 'exocytosis',
        timestamp: new Date().toISOString()
      }

      return new Response(JSON.stringify(stats), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (request.method === 'POST') {
      // 记录访问
      // 这里应该增加 KV 存储中的计数器
      // await env.KV_NAMESPACE.put('stats:visits', (parseInt(await env.KV_NAMESPACE.get('stats:visits') || '0') + 1).toString())

      return new Response(JSON.stringify({
        success: true,
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
