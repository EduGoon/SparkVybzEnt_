// Generic API helper that handles token storage and 401 responses.

const API_BASE = 'http://localhost:4000/api/v1';

let logoutCallback: (() => void) | null = null;

export const registerLogoutCallback = (fn: () => void) => {
  logoutCallback = fn;
};

export const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

interface RequestOptions extends RequestInit {
  body?: any;
}

async function handleResponse(response: Response) {
  if (response.status === 401) {
    // unauthorized, token invalid/expired
    if (logoutCallback) logoutCallback();
    throw new Error('Unauthorized');
  }

  // throw on non-ok status except 204
  if (!response.ok && response.status !== 204) {
    const errorText = await response.text();
    let errMsg = errorText;
    try {
      const json = JSON.parse(errorText);
      errMsg = json.message || JSON.stringify(json);
    } catch {}
    const err = new Error(errMsg || response.statusText);
    // @ts-ignore
    err.status = response.status;
    throw err;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return handleResponse(res);
}
