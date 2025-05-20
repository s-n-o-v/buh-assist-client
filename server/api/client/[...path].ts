export default defineEventHandler(async (event) => {
  const path = event.context.params?.path;
  const method = event.node.req.method;
  let response = null;

  const url = `/clients`;
  if (method === 'GET') {
    if (path === "list") {
      response = await fetchWithAuth(event, url);
    } else {
      response = await fetchWithAuth(event, `${url}/${path}`);
    }
  } else if (method === "POST") {
    const body = await readBody(event);
    switch (path) {
      case "new":
        response = await fetchWithAuth(event, url, { method: "POST", body });
        break;
      case "update":
        response = await fetchWithAuth(event, url, { method: "PATCH", body });
        break;
      case "remove":
        response = await fetchWithAuth(event, url, { method: "DELETE", body });
        break;
    }
  }
  return response;
});
