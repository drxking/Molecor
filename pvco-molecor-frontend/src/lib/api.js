const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// News endpoints
export async function fetchNews() {
  const url = `${API_BASE_URL}/api/news/`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch news (Status: ${res.status})`);
  }

  return res.json();
}

// export async function fetchNewsItem(id) {
//   const url = `${API_BASE_URL}/api/news/${id}/`;
//   const res = await fetch(url);

//   if (!res.ok) {
//     if (res.status === 404) return null;
//     throw new Error(`Failed to fetch news item (Status: ${res.status})`);
//   }

//   return res.json();
// }

// Case Studies endpoints
export async function fetchCaseStudies(filters = {}) {
  const queryParams = new URLSearchParams();
  
  if (filters.category) queryParams.append('category', filters.category);
  if (filters.region) queryParams.append('region', filters.region);
  if (filters.year) queryParams.append('year', filters.year);
  
  const url = `${API_BASE_URL}/api/case-studies/?${queryParams.toString()}`;
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch case studies (Status: ${res.status})`);
  }
  
  return res.json();
}

export async function fetchCaseStudyBySlug(slug) {
  const url = `${API_BASE_URL}/api/case-studies/${slug}/`;
  const res = await fetch(url);
  
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch case study (Status: ${res.status})`);
  }
  
  return res.json();
}

// Common utility for all API calls
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  const res = await fetch(url, config);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API request failed (Status: ${res.status})`,
      {
        cause: {
          status: res.status,
          data: errorData
        }
      }
    );
  }

  return res.json();
}

// Example of how to use the apiRequest utility:
/*
export async function fetchSomeData() {
  return apiRequest('/api/some-endpoint/', {
    method: 'GET',
    next: { revalidate: 3600 } // Optional revalidation
  });
}
*/
// In both pages
export const metadata = {
  title: 'News | Molecor',
  description: 'Latest news and updates from Molecor',
};