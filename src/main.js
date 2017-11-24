import './css/common.css';

function getData() {
    let promise = new Promise((resolve, reject) => {
        let key = ~~(Math.random() * 10);
        console.log(key)
        if (key >= 5) {
            let obj = {
                msg: "ok",
                data: key
            };
            resolve.call(this, obj);
        } else {
            let obj = {
                msg: "error",
                data: key
            };
            reject.call(this, obj)
        }
    })
    return promise
}
let container = document.querySelector('#app');

getData().then((data) => {
    container.innerHTML = JSON.stringify(data)
}, (err) => {
    container.innerHTML = JSON.stringify(err)
})