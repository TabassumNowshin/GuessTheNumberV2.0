let count = 0,
min = 1,
max = 10,
life = 3;
answer = random(min, max);


//get element
let form = document.querySelector("#form");

//restart button disabled at the beginning
document.querySelector("#res").disabled = true;

//event listner
form.addEventListener("submit", strtGame);

//function
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min; //min, max included
}

function strtGame(e) {
    e.preventDefault();

    let input = document.querySelector("#input").value;

    if(input === "") {
        showmsg("Empty Field!", 128529);
    } else if(input>max || input<min) {
        showmsg("Input Out of Range!", 128530);
    }else {
        count += 1;
        if(count == 3 && answer != input) {
            showmsg("You Lose!", 129301);
            life = 0;
            btndisable();
            btnenable();
            changemsg();
        } else if(input<answer) {
            showmsg("Correct Answer Is Greater!", 128580);
            life -= 1;
        } else if(input>answer) {
            showmsg("Correct Answer Is Smaller!", 128553);
            life -= 1;
        } else {
            showmsg("You Win", 127881);
            btndisable();
            btnenable();
            changemsg();
        }
        
        showlife(life);
    }
    document.querySelector("#input").value = "";
}

function btndisable() {
    document.querySelector("#input").disabled = true;
    document.querySelector("#submit").disabled = true;
}

function btnenable() {
    document.querySelector("#res").disabled = false;
}

function showlife(life) {
    document.querySelector("#life").innerHTML = life;
}

function showmsg(msg, emoji) {
    let container = document.querySelector(".container"),
    af = document.querySelector("p");

    let output = document.createElement("div");
    output.innerHTML = `${msg} &#${emoji};`; 

    output.style.color = "white";
    
    switch (emoji) {
        case 128529:
            output.style.backgroundColor = "#ff3300";
            break;
        case 128530:
            output.style.backgroundColor = "#cc0066";
            break;
        case 129301:
            output.style.backgroundColor = "#003d99";
            break;
        case 128553:
        case 128580:
            output.style.backgroundColor = "#ffff00";
            output.style.color = "black";
            break;
        case 127881:
            output.style.backgroundColor = "#39e600";
            break;
    }
    output.style.fontWeight = "bold";
    container.insertBefore(output, af);

    setTimeout(() => {
        output.remove();
    }, 2000);
}

function changemsg() {
    document.querySelector("p").innerHTML = "Game Over! Want to try again? Restart!"
}