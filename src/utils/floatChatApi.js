/* ═══════════════════════════════════════════════════════════════
   FloatChat API Integration Layer
   ─────────────────────────────────────────────────────────────
   Handles the full query pipeline:
     1. classifyQuery     → POST /api/queryClassification
     2. Route by type:
        KNOWLEDGE_QUERY  → chatKnowledge()
        DATA_QUERY       → chatData()
        HYBRID_QUERY     → chatHybrid()
     3. Export a single sendFloatMessage() that the UI calls
═══════════════════════════════════════════════════════════════ */

const BASE_URL = 'https://float-chat-backend.vercel.app/api'

// DB Queries are routed to our local testing endpoint which receives {"query": "SELECT ..."}
const DB_QUERY_ENDPOINT = 'https://asomatous-lorri-conciliatorily.ngrok-free.dev/api/query'

// ─────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────

async function post(endpoint, body) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API error ${res.status}: ${text || res.statusText}`)
  }

  return res.json()
}

function extractChatResponse(data) {
  let parsed = data
  if (typeof data === 'string') {
    try { parsed = JSON.parse(data) } catch (e) {}
  }

  return (
    parsed?.reply ??
    parsed?.response ??
    parsed?.message ??
    parsed?.answer ??
    parsed?.content ??
    parsed?.text ??
    (typeof parsed === 'string' ? parsed : JSON.stringify(parsed))
  )
}

// ─────────────────────────────────────────────────────────────
// Step 1 — Classify the query
// ─────────────────────────────────────────────────────────────

export async function classifyQuery(query) {
  const data = await post(`${BASE_URL}/queryClassification`, { message: query })

  let parsed = data
  if (typeof data === 'string') {
    try { parsed = JSON.parse(data) } catch (e) {}
  }

  const type =
    parsed?.reply ??
    parsed?.queryType ??
    parsed?.type ??
    parsed?.classification ??
    (typeof parsed === 'string' ? parsed : null)

  if (!type) throw new Error('Query classification returned an unexpected response format.')

  const normalised = String(type).trim().toUpperCase()
  if (!['KNOWLEDGE_QUERY', 'DATA_QUERY', 'HYBRID_QUERY'].includes(normalised)) {
    throw new Error(`Unknown query type: "${normalised}"`)
  }

  return normalised
}

// ─────────────────────────────────────────────────────────────
// Step 2a — KNOWLEDGE_QUERY
// ─────────────────────────────────────────────────────────────

export async function chatKnowledge(query) {
  const data = await post(`${BASE_URL}/chat`, {
    message: query,
  })
  return { content: extractChatResponse(data) };
}

// ─────────────────────────────────────────────────────────────
// Step 2b — DATA_QUERY
// ─────────────────────────────────────────────────────────────

export async function chatData(query) {
  // Call dataQuery endpoint to get the SQL and charting intent
  const apiRes = await post(`${BASE_URL}/chat/dataQuery`, { message: query })
  
  // Execute the returned SQL against our local database backend
  // Note: the input specifies { query } as the required prop here locally
  const dbRes = await post(DB_QUERY_ENDPOINT, { query: apiRes.sql })
  
  if (!dbRes.success) {
    throw new Error(dbRes.error || 'Failed to query database')
  }

  if (apiRes.type === 'graph') {
    // Extract x/y based on the columns defined by the apiRes
    const xKey = apiRes.x || (dbRes.columns && dbRes.columns[0]);
    const yKey = apiRes.y || (dbRes.columns && dbRes.columns[1]);
    
    // Fallbacks provided just in case the SQL returns aliases instead of pure mappings
    let x = apiRes.x ? dbRes.data.map(row => row[apiRes.x]) : dbRes.data.map(row => Object.values(row)[0]);
    let y = apiRes.y ? dbRes.data.map(row => row[apiRes.y]) : dbRes.data.map(row => Object.values(row)[1]);

    // Cap at 100 points to avoid browser performance issues and visual clutter
    if (x.length > 100) {
      x = x.slice(0, 100);
      y = y.slice(0, 100);
    }

    return {
      isGraph: true,
      graphData: { x, y, xLabel: xKey, yLabel: yKey },
      dataDescription: apiRes.data_description
    }
  } else {
    // scalar 
    let val = dbRes.scalarValue;
    if (val === undefined && dbRes.data && dbRes.data.length > 0) {
       // if scalarValue isn't directly placed by API, peek at the array output
       val = Object.values(dbRes.data[0])[0];
    }
    
    // Normalize value for React rendering
    let displayVal = val;
    if (val === null || val === undefined || val === '') {
      displayVal = 'N/A';
    } else if (typeof val === 'number') {
      displayVal = Number.isInteger(val) ? val : Number(val).toFixed(2);
    } else if (typeof val === 'string' && !isNaN(Number(val))) {
      const num = Number(val);
      displayVal = Number.isInteger(num) ? num : num.toFixed(2);
    } else {
      displayVal = String(val); // fallback for whatever else it could be
    }

    return {
      isScalar: true,
      scalarValue: displayVal,
      dataDescription: apiRes.data_description
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Step 2c — HYBRID_QUERY
// ─────────────────────────────────────────────────────────────

export async function chatHybrid(query) {
  // Call hybridQuery endpoint
  const hybridRes = await post(`${BASE_URL}/chat/hybridQuery`, { message: query })
  
  // Directly query the local database backend with the SQL payload
  const dbRes = await post(DB_QUERY_ENDPOINT, { query: hybridRes.sql })
  
  if (!dbRes.success) {
    throw new Error(dbRes.error || 'Failed to query database')
  }

  const xKey = hybridRes.x || (dbRes.columns && dbRes.columns[0]);
  const yKey = hybridRes.y || (dbRes.columns && dbRes.columns[1]);
  
  let x = dbRes.data.map(d => d[xKey] ?? d.x ?? Object.values(d)[0]);
  let y = dbRes.data.map(d => d[yKey] ?? d.y ?? Object.values(d)[1]);

  // Cap at 100 points to avoid browser performance issues and visual clutter
  if (x.length > 100) {
    x = x.slice(0, 100);
    y = y.slice(0, 100);
  }

  return {
    isHybrid: true,
    isGraph: true, // we render a graph alongside explanations
    graphData: { x, y, xLabel: xKey, yLabel: yKey },
    explanation: hybridRes.explanation,
    dataDescription: hybridRes.data_description
  }
}

// ─────────────────────────────────────────────────────────────
// Top-level orchestrator — this is what ChatInterface calls
// ─────────────────────────────────────────────────────────────

/**
 * Full pipeline: classify → route → return structured payload.
 */
export async function sendFloatMessage(query) {
  const queryType = await classifyQuery(query)

  let payload
  switch (queryType) {
    case 'KNOWLEDGE_QUERY':
      payload = await chatKnowledge(query)
      break
    case 'DATA_QUERY':
      payload = await chatData(query)
      break
    case 'HYBRID_QUERY':
      payload = await chatHybrid(query)
      break
    default:
      throw new Error(`Unhandled query type: ${queryType}`)
  }

  return { payload, queryType }
}

