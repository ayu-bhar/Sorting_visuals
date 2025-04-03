let a = [];
let copy = [];
let n = 65;
let b = document.getElementsByClassName("box");
function addEvent() {
    document.getElementById("i").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let input = document.getElementById("i").value;
            n = parseInt(input);
            console.log('changed');
            fill();
        }
    });
}
function fill() {
    if (b.length > 0) {
        while (b.length > 0) {
            b[0].remove();
        }
    }
    for (let i = 0; i < n; i++) {
        let random = Math.floor(Math.random() * 700) + 1;
        a[i] = random;
        copy[i] = random;
    }
    updateDisplay();
}
function updateDisplay() {
    let box = document.querySelector(".container");
    for (let i = 0; i < n; i++) {
        let div = document.createElement("div");
        div.classList.add("box");
        div.style.height = a[i] + "px";
        box.appendChild(div);
    }
    b = document.getElementsByClassName("box");
}
async function changeBox(l, r) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (r != -1) {
                b[l].style.height = a[l] + "px";
                b[r].style.height = a[r] + "px";
            }
            else{
                b[l].style.height = a[l] + "px";
            }
            resolve();
        }, 50);
    });
}
async function bubbleSort() {
    let d = 0;
    while (d < n - 1) {
        let assist = 0;
        let l = 0, r = 1;
        while (r < n - d) {
            if (a[l] > a[r]) {
                let t = a[r];
                a[r] = a[l];
                a[l] = t;
                assist = 0;
                await changeBox(l, r);
            }
            else {
                assist++;
            }
            r++; l++;
        }
        d++;
        d += assist;
    }
}
async function selectionSort() {
    for (let i = 0; i < n - 1; i++) {
        let min = a[i];
        let ind = i;
        for (let j = i + 1; j < n; j++) {
            if (a[j] < min) {
                min = a[j];
                ind = j;
            }
        }
        a[ind] = a[i];
        a[i] = min;
        await changeBox(i, ind);
    }
}
async function insertionSort() {
    for (let i = 1; i < n; i++) {
        let t = a[i];
        for (let j = i - 1; j >= 0; j--) {
            if (a[j] > t) {
                a[j + 1] = a[j];
                a[j] = t;
                await changeBox(j, j + 1);
            }
            else {
                break;
            }
        }
    }
}
async function quickSort(s = 0, e = n-1) {
    let l = s + 1, r = e;
    p = a[s];
    while (true) {
        while (l < e && a[l] < p) {
            l++;
        }
        while (r > s && a[r] > p) {
            r--;
        }
        let t = a[r];
        if (r > l) {
            a[r] = a[l];
            a[l] = t;
            await changeBox(l, r);
        }
        else {
            a[r] = a[s];
            a[s] = t;
            await changeBox(s, r);
            break;
        }
    }
    if (l < e) {
        await quickSort(l, e);
    }
    if (r - 1 > s) {
        await quickSort(s, r - 1);
    }
}
async function mergeSort(s = 0, e = n - 1) {
    if (s < e) {
        let mid = Math.floor((s + e) / 2);
        await mergeSort(s, mid);
        await mergeSort(mid + 1, e);
        await merge(s, mid, e);
    }
}
async function merge(s, mid, e) {
    let i = s, j = mid + 1;
    let k = 0;
    let arr = [];
    while (i <= mid && j <= e) {
        if (a[i] < a[j]) {
            arr[k] = a[i];
            i++;
        }
        else {
            arr[k] = a[j];
            j++;
        }
        k++;
    }
    while (i <= mid) {
        arr[k] = a[i];
        k++; i++;
    }
    while (j <= e) {
        arr[k] = a[j];
        k++; j++;
    }
    for (let i = s; i <= e; i++) {
        a[i] = arr[i - s];
        await changeBox(i, -1);
    }
}
async function sbkaSort() {
    for(let i = 0;i<n;i++){
        for(let j = i+1;j<n;j++){
            if(a[i]>a[j]){
                let t = a[j];
                a[j] = a[i];
                a[i] = t;
                await changeBox(i,j);
            }
        }
    }
}
async function countSort() {
    let max = Math.max(...a);
    let count = new Array(max + 1).fill(0);
    for (let i = 0; i < n; i++) {
        count[a[i]]++;
    }
    let index = 0;
    for (let i = 0; i <= max; i++) {
        while (count[i] > 0) {
            a[index] = i;
            await changeBox(index, -1);
            index++;
            count[i]--;
        }
    }
}
function deSort(){
    a = [];
    a = [...copy];
    for(let i = 0;i<n;i++){
        b[i].style.height = a[i] + "px";
    }
}
