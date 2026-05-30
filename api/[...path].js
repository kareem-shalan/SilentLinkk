const API_ORIGIN = process.env.API_ORIGIN || 'http://silentlink.runasp.net';

export default async function handler(req, res) {
  const segments = req.query.path;
  const apiPath = Array.isArray(segments) ? segments.join('/') : segments || '';
  const targetUrl = `${API_ORIGIN}/api/${apiPath}`;

  const headers = {
    'Content-Type': req.headers['content-type'] || 'application/json',
  };

  if (req.headers.authorization) {
    headers.Authorization = req.headers.authorization;
  }

  const fetchOptions = {
    method: req.method,
    headers,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
    fetchOptions.body =
      typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }

  try {
    const response = await fetch(targetUrl, fetchOptions);
    const contentType = response.headers.get('content-type') || '';
    const body = await response.text();

    res.status(response.status);
    res.setHeader('Content-Type', contentType || 'application/json');
    res.send(body);
  } catch (error) {
    console.error('API proxy error:', targetUrl, error);
    res.status(502).json({ message: 'Unable to reach API server.' });
  }
}
