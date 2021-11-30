const vue = new Vue({
    el: '#vue',
    data: {list:[

    ]},
    mounted: ()=>{
        const url = 'http://localhost:3000/get-all';
    
        try {
            fetch(url).then(res =>res.json()).then(list => this.list=list)
            
           
    
        } catch (error) {
            console.log(error)
        }
    }

})
