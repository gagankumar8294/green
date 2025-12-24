export const API = "https://green-world-backend-ydlf.onrender.com/api"; // your backend URL

export async function post(url, data) {
  const res = await fetch(`${API}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: "include"   // for cookies/session
  });

  return res.json();
}

export async function get(url) {
  const res = await fetch(`${API}${url}`, {
    method: "GET",
    credentials: "include"
  });
  return res.json();
}
