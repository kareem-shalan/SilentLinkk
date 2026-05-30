const API_ORIGIN = process.env.API_ORIGIN || 'http://silentlink.runasp.net';

export const config = {
  api: {
    bodyParser: false,
  },
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  const segments = req.query.path;
  const apiPath = Array.isArray(segments) ? segments.join('/') : segments || '';
  const targetUrl = `${API_ORIGIN}/api/${apiPath}`;

  const headers = {};

  if (req.headers['content-type']) {
    headers['Content-Type'] = req.headers['content-type'];
  }

  if (req.headers.authorization) {
    headers.Authorization = req.headers.authorization;
  }

  const fetchOptions = {
    method: req.method,
    headers,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const rawBody = await readRawBody(req);
    if (rawBody.length > 0) {
      fetchOptions.body = rawBody;
      headers['Content-Length'] = String(rawBody.length);
    }
  }

  try {
    const response = await fetch(targetUrl, fetchOptions);
    const body = await response.text();
    const contentType = response.headers.get('content-type');

    res.status(response.status);
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    res.send(body);
  } catch (error) {
    console.error('API proxy error:', targetUrl, error);
    res.status(502).json({ message: 'Unable to reach API server.' });
  }
}
