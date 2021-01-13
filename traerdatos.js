const fetch_data = async () => new Promise((resolve,reject)=>

    fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(res =>{resolve(res)})
) 

