const vue = new Vue({
    el: '#vue',
    data: {
        list: [],
        selected: {}
    },
    mounted: async function () {
        const url = '/get-all';
        try {
            const req = await fetch(url);
            const res = await req.json();

            this.list = res;
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        openModal: function (e) {
            const item = this.list[e.target.id];
            this.selected = item;
        },
        print: function (e){
            const buttons = document.querySelector(".modal-footer");
            buttons.classList.toggle('hide');
            window.print();
            buttons.classList.toggle('hide');
        }
    }
})
