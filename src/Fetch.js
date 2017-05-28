export default function call(uri, method, body = false){
  if(body !== false && method!=="GET"){
    body = JSON.stringify(body);
  }
  return fetch('http://crmbeta.azurewebsites.net/'+uri,{method: method,
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body : body,
    }
  )
  .then(function(response){
    if (!response.ok) {
      return {error: true, message: response.statusText};
    }
	const contentType = response.headers.get("content-type");
  if(contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    return response.text();
  }
  })
  .then(data => Promise.resolve(data))
  .catch((error) => {
      return {error: true, message: error.message};
    });
}

