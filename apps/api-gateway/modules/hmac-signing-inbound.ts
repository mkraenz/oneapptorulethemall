import { ZuploContext, ZuploRequest } from '@zuplo/runtime';

interface PolicyOptions {
  secret: string;
  headerName: string;
}

export default async function (
  request: ZuploRequest,
  context: ZuploContext,
  options: PolicyOptions,
  policyName: string
) {
  // Validate the policy options
  if (typeof options.secret !== 'string') {
    throw new Error(
      `The option 'secret' on policy '${policyName}' must be a string. Received ${typeof options.secret}.`
    );
  }
  if (typeof options.headerName !== 'string') {
    throw new Error(
      `The option 'headerName' on policy '${policyName}' must be a string. Received ${typeof options.headerName}.`
    );
  }

  // Get the data to verify
  // This could be anything (headers, query parameter, etc.)
  // For this example, we will just verify the entire body value
  const data = await request.text();

  // Create a crypto key from a secret stored as an environment variable
  const encoder = new TextEncoder();
  const encodedSecret = encoder.encode(options.secret);
  const key = await crypto.subtle.importKey(
    'raw',
    encodedSecret,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(data));

  // `mac` is an ArrayBuffer, so you need to make a few changes to get
  // it into a ByteString, and then a Base64-encoded string.
  const base64Mac = btoa(String.fromCharCode(...new Uint8Array(mac)));

  // must convert "+" to "-" as urls encode "+" as " "
  const base64MacUrlCompatible = base64Mac.replaceAll('+', '-');
  request.headers.set(options.headerName, base64MacUrlCompatible);

  return request;
}
