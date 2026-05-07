const balance = {
    bal: 1000,

    reset: () => {
        balance.bal = 1000;
        balance.span.textContent = balance.bal;
    },

    span: document.querySelector("#balance"),

    subtract: (amount) => {
        balance.bal -= amount;
        balance.span.textContent = balance.bal;
    },

    update: (amount, multi) => {
        balance.bal += amount * multi;
        document.querySelector("#status").textContent = `You won ${amount * multi}!`;
        balance.span.textContent = balance.bal;
    }
}

const bets = {
    bet: (amount) => {
        
    },

    bets: [],

    odds: (winCon) => {
        if (winCon === "green") return "35:1";
        else return "2:1";
    },

    reset: () => {

    }
}

const buttons = {
    balance: document.querySelector("#reset-balance"),

    bet: document.querySelector("#bet"),

    black: document.querySelector("#black"),

    even: document.querySelector("#even"),

    first: document.querySelector("#first"),

    green: document.querySelector("#green"),

    high: document.querySelector("#high"),

    low: document.querySelector("#low"),

    odd: document.querySelector("#odd"),

    red: document.querySelector("#red"),

    reset: document.querySelector("#reset"),

    second: document.querySelector("#second"),

    third: document.querySelector("#third")
}

const driver = () => {
    numbers.all.forEach(x => {
        if (x === 0) return;
        let div = document.createElement("div");
        div.textContent = x;
        div.classList.add(numbers.color(x), "number");
        div.number = x;
        div.innerHTML += `<div class="marked"></div>`;
        let types = numbers.types(x);
        types.forEach(y => {
            div.classList.add(y);
        }); 
        document.querySelector("#numbers").appendChild(div);
    });

    let nums = document.querySelectorAll(`#numbers div`);
    let green = document.querySelector(".green");
    numbers.allNumberDivs = [...nums, green];
}

const elements = {
    rolled: document.querySelector("#rolled"),

    status: document.querySelector("#status")
}

const numbers = {
    all: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],

    allNumberDivs: [],

    black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],

    color: (n) => {
        if (typeof n !== "number") return null;
        let black = numbers.black.find(x => x === n);
        let red = numbers.red.find(x => x === n);

        if (black) return "black";
        if (red) return "red";
        
        return "green";
    },

    current: null,

    draw: () => {
        numbers.current = numbers.all[Math.floor(Math.random() * numbers.all.length)];
        return numbers.current;
    },
    
    green: [0],

    red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],

    types: (n) => {
        let types = [];
        if (n <= 12) types.push("first");

        if (n > 12 && n <= 24) types.push("second"); 

        if (n > 24 && n <= 36) types.push("third");

        if (n <= 18) types.push("low");

        if (n > 18) types.push("high");

        if (n % 2 === 0) types.push("even");

        if (n % 2 !== 0) types.push("odd");

        return types;
    }
}

const winCons = {
    black: (n) => {
        if (numbers.black.includes(n)) return true;
        else return false;
    },

    even: (n) => {
        if (n % 2 === 0) return true;
        else return false;
    },

    first: (n) => {
        if (n <= 12) return true;
        else return false;
    },

    green: (n) => {
        if (n === 0) return true;
        else return false;
    },

    high: (n) => {
        if (n > 18) return true;
        else return false;
    },

    low: (n) => {
        if (n <= 18) return true;
        else return false;
    },

    number: (n, selected) => {
        if (selected.includes(n)) return true;
        else return false;
    },

    odd: (n) => {
        if (n % 2 !== 0) return true;
        else return false;
    },

    red: (n) => {
        if (numbers.red.includes(n)) return true;
        else return false;
    },

    second: (n) => {
        if (n > 12 && n <= 24) return true;
        else return false;
    },

    third: (n) => {
        if (n > 24 && n <= 36) return true;
        else return false;
    }
}

driver();