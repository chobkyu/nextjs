export const getOption = (methodName:string, obj:any) => {
    let method = methodName;
    let headers = {
        'Content-Type' : 'application/json'
    }
    let body = JSON.stringify(obj)
    
    const option = { method, headers, body }

    return option;
}