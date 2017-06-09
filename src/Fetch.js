export function call(url, method, body = false, error_message = "Something went wrong"){
  if(body !== false && method!=="GET"){
    body = JSON.stringify(body);
  }
  return fetch(url,{method: method,
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body : body,
    }
  )
  .then(function(response){
    if (!response.ok) {
      return response;
    }
    return response;
   
  })
  .then(response => response.json())
  .catch((error) => {
      return error;
    });
}
export default call;