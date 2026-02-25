export const onRequestPost: PagesFunction = async (context) => {
  const formData = await context.request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const organisation = formData.get('organisation') as string;
  const eventDate = formData.get('event_date') as string;
  const message = formData.get('message') as string;

  // Validate required fields
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Honeypot check
  const honeypot = formData.get('_gotcha') as string;
  if (honeypot) {
    // Silently accept but don't process
    return new Response(JSON.stringify({ success: true, message: 'Thank you for your message. We will be in touch.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const submission = {
    name,
    email,
    organisation: organisation || 'Not provided',
    eventDate: eventDate || 'Not specified',
    message,
    timestamp: new Date().toISOString(),
    source: 'azeemazhar.com',
  };

  // Log submission (visible in Cloudflare dashboard logs)
  console.log('Contact form submission:', JSON.stringify(submission));

  return new Response(JSON.stringify({
    success: true,
    message: 'Thank you for your message. We will be in touch within 48 hours.',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
