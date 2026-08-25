const MAX_FORM_BODY_BYTES = Number(process.env.PS_MAX_FORM_BODY_BYTES || 64 * 1024);

export const config = {
  matcher: '/api/submit-form',
};

export default function middleware(request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_FORM_BODY_BYTES) {
    return new Response(JSON.stringify({ error: 'Request too large' }), {
      status: 413,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
