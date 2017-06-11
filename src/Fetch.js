export default function call(url, method, body = false, error_message = "Failue"){
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
                const resp = {
                    error: response.status,
                    message: response.statusText
                };
                throw new Error(JSON.stringify(resp));
            }
            return response.json();
        })
        .then(data =>{
            return data;
        })
        .catch((error) => {
            return error;
        });
}