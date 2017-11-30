import './css/common.css';
import './css/style.less';
import './css/index.scss'

function getData() {
    let promise = new Promise((resolve, reject) => {
        let key = ~~(Math.random() * 10);
        let temp = ['es6', 'babel']
        if (key >= 5) {
            let obj = {
                msg: "ok",
                data: [key, ...temp]
            };
            resolve.call(this, obj);
        } else {
            let obj = {
                msg: "error",
                data: [key, ...temp]
            };
            reject.call(this, obj);
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