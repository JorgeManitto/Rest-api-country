const demo = document.getElementById('demo')
const select = document.getElementById('select')
const input = document.getElementById('input')
const contents = document.getElementsByClassName('content') 
const modal = document.getElementById('modal')
const dark = document.getElementById('dark_mode')
const conteiner = document.getElementById("conteiner")
const nav = document.getElementById('nav')
const body = document.body

demo.innerHTML="<span>loading...</span>"
//show countries
const nombre = async () => {
    const name = await fetch_data().then(res => res)
    demo.innerHTML=""

    for(let i = 0;i<name.length;i++){

        let div_content  = document.createElement('DIV')
        div_content.className = "content";
        div_content.id = `${name[i].name}`; 
       
        let div_flag     = document.createElement('IMG')
        div_flag.src     = `${name[i].flag}`;
        div_flag.className = "flag";

        let country_name = document.createElement('H4')
         country_name.textContent = `${name[i].name}`
        country_name.className ='country_name';

        let li1 = document.createElement("LI")
        li1.textContent = `Population:${name[i].population}`

        let li2 = document.createElement("LI")
        li2.textContent = `Region: ${name[i].region}`
        
        let li3 = document.createElement("LI")
        li3.textContent = ` Capital: ${name[i].capital}`

        let ul = document.createElement("UL")
        ul.appendChild(li1)
        ul.appendChild(li2)
        ul.appendChild(li3)

        let div = document.createElement("DIV")
        div.className ="data_country"
        div.appendChild(ul)

        div_content.appendChild(div_flag)
        div_content.appendChild(country_name)
        div_content.appendChild(div)

        demo.appendChild(div_content)

        if(i > 7){
            contents[i].style.display = "none";
        }
    }    
    return name
}

 nombre().then(res => res)
//search country
input.addEventListener('keyup',async()=>{
    const name = await fetch_data().then(res => res)
    let filter = input.value.toUpperCase();
    for(let i = 0; i < name.length; i++){
        
        if(name[i].name.toUpperCase().indexOf(filter) > -1){
          
          contents[i].style.display = "block";

        if(filter == ""){
            if(i>7){
                contents[i].style.display = "none";
            }         
        }
        }
        else {
            contents[i].style.display = "none";
        }   
    }
})
//select by region
select.addEventListener('change',async()=>{
    const name = await fetch_data().then(res => res)


    for(let i = 0;i<name.length;i++){
        if(name[i].region == select.value){
            contents[i].style.display = "block";
        }
        
        else {
            contents[i].style.display = "none";
            if(select.value == "all"){
                contents[i].style.display = "block";
                if(i>7){
                    contents[i].style.display = "none";
                } 
            }
        }
      
    }
})  
//modal. (need change)
setTimeout(()=>{
    
    for (let i = 0; i < contents.length; i++) {
        contents[i].addEventListener('click',async(e)=>{
            let nombre = e.currentTarget.children[1].innerText
            
            const name = await fetch_data().then(res => res)
            body.classList.toggle("modal_active")
            for(let i = 0;i<name.length;i++){

                if(name[i].name == nombre){
                    modal.style.display="block";
                    modal.innerHTML = '<button onclick="btn_back()" class="btn_back">Back</button>'
                    console.log(nombre)

                    let div_content = document.createElement('DIV')
                    div_content.className = "content_modal"

                    let flag       = document.createElement('IMG') 
                    flag.src       = `${name[i].flag}`
                    flag.className = "flag_modal"

                    let country_modal      = document.createElement('h2')
                    country_modal.className ="country_modal"
                    country_modal.textContent =`${name[i].name}`

                    let nativeName         = document.createElement('DIV')
                    nativeName.innerHTML =  `<strong>Native Name</strong>:${name[i].nativeName}`

                    let population         = document.createElement('DIV')
                    population.innerHTML =  `<strong>Population</strong>:${name[i].population}`

                    let region         = document.createElement('DIV')
                    region.innerHTML =  `<strong>Region</strong>:${name[i].region}`

                    let subregion         = document.createElement('DIV')
                    subregion.innerHTML =  `<strong>Sub Region</strong>:${name[i].subregion}`

                    let capital         = document.createElement('DIV')
                    capital.innerHTML =  `<strong>Capital</strong>:${name[i].capital}`

                    let toplevel         = document.createElement('DIV')
                    toplevel.innerHTML =  `<strong>Top level Domain</strong>:${name[i].topLevelDomain[0]}`

                    let currencies         = document.createElement('DIV')
                    currencies.innerHTML =  `<strong>Currencies</strong>:${name[i].currencies.map(currency => currency.code)}`

                    let languages         = document.createElement('DIV')
                    languages.innerHTML =  `<strong>Languages</strong>:${name[i].languages.map(languages => languages.name)}`

                    let border         = document.createElement('DIV')
                    border.innerHTML =  `<strong>Border Countries</strong>:${name[i].borders}`
                    
                    let div       = document.createElement('DIV')
                    div.className = 'country_data_modal'

                    div.appendChild(country_modal)
                    div.appendChild(nativeName)
                    div.appendChild(population)
                    div.appendChild(region)
                    div.appendChild(subregion)
                    div.appendChild(capital)
                    div.appendChild(toplevel)
                    div.appendChild(currencies)
                    div.appendChild(languages)
                    div.appendChild(border)

                    div_content.appendChild(flag)                    
                    div_content.appendChild(div)

                    modal.appendChild(div_content)
                }
            }
        })
    }
},2000)

    function btn_back (){
        modal.style.display="none";
        body.classList.remove("modal_active")
    }

 
    dark.addEventListener('change',()=>{
       conteiner.classList.toggle("dark-mode");
       body.classList.toggle("dark-mode");
       modal.classList.toggle("dark-mode")
       input.classList.toggle('dark-mode')
       select.classList.toggle('dark-mode')
       nav.classList.toggle('dark-mode-nav')
       input.classList.toggle("dark-mode-nav")
       select.classList.toggle("dark-mode-nav")
        for(let i = 0; i<contents.length;i++){
            contents[i].classList.toggle("dark-mode-content");
        }
           
       
    })
