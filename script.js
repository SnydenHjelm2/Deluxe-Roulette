const bets = {
    bet: () => {

    },

    bets: [],

    odds: (winCon) => {
        if (winCon === "green") return "35:1";
        else return "2:1";
    },

    reset: () => {
        numbers.allNumberDivs.forEach(x => {
            x.classList.remove("hover-red", "hover-black", "hover-green", "marked", "greyd-out");
        });
    }
}

const buttons = {
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
        div.classList.add(numbers.color(x));
        div.number = x;
        let types = numbers.types(x);
        types.forEach(y => {
            div.classList.add(y);
        }); 
        document.querySelector("#numbers").appendChild(div);
    });

    let nums = document.querySelectorAll(`#numbers div`);
    let green = document.querySelector(".green");
    numbers.allNumberDivs = [...nums, green];

    for (let button in buttons) {
        buttons[button].addEventListener("mouseenter", () => {
            if (buttons[button].id === "bet" || buttons[button].id === "reset") return;
            numbers.allNumberDivs.forEach(x => {
                if (!x.classList.contains(`${buttons[button].id}`)) {
                    if (numbers.color(x.number) === "red") x.classList.add("hover-red")
                    else if (numbers.color(x.number) === "black") x.classList.add("hover-black")
                    else x.classList.add("hover-green");
                };
            });
            document.querySelector("#status").textContent = `Pays: ${bets.odds(buttons[button].id)}`;
        });

        buttons[button].addEventListener("mouseleave", () => {
            if (buttons[button].id === "bet" || buttons[button].id === "reset") return;
            numbers.allNumberDivs.forEach(x => {
                x.classList.remove("hover-red", "hover-black", "hover-green");
            });
            document.querySelector("#status").textContent = "...";
        });

        buttons[button].addEventListener("click", () => {
            if (buttons[button].id === "bet" || buttons[button].id === "reset") return;
            numbers.allNumberDivs.forEach(x => {
                if (x.classList.contains("marked") && x.classList.contains(`${buttons[button].id}`)) x.classList.remove("marked")
                else if (x.classList.contains("marked")) return;

                if (!x.classList.contains("hover-red") && !x.classList.contains("hover-black") && !x.classList.contains("hover-green")) {
                    x.classList.add("marked");
                    x.classList.remove("greyd-out");
                } else {
                    x.classList.add("greyd-out");
                }
            })
        });
    }

    numbers.allNumberDivs.forEach(x => {
        x.addEventListener("mouseenter", () => {
            numbers.allNumberDivs.forEach(y => {
                if (y.number !== x.number) {
                    if (numbers.color(y.number) === "red") y.classList.add("hover-red")
                    else if (numbers.color(y.number) === "black") y.classList.add("hover-black")
                    else y.classList.add("hover-green");
                }
            });
            document.querySelector("#status").textContent = `Pays: ${bets.odds("green")}`;
        });
    });

    numbers.allNumberDivs.forEach(x => {
        x.addEventListener("mouseleave", () => {
            numbers.allNumberDivs.forEach(y => {
                y.classList.remove("hover-red", "hover-black", "hover-green");
            });
            document.querySelector("#status").textContent = "...";
        });
    });

    //lägg till stöd för "click" på alla nummer
    //börja koda själva spelet (så man kan betta)

    buttons.reset.addEventListener("click", bets.reset);
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