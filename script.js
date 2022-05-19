const add_btn = document.querySelector(".add-btn");
const modal = document.querySelector(".modal-cont")
const text_area = document.querySelector(".textarea-cont");
const main_cont = document.querySelector(".main-cont");
const pty_btn = document.querySelectorAll(".priority-color")
const toolbox_color = document.querySelectorAll(".color");
let colors = ["pink", "blue", "green", "black"];
var uid = new ShortUniqueId();

let ticketArr = [];



toolbox_color.forEach(btnclr=>{
    btnclr.addEventListener("click",()=>{
        let cc = btnclr.classList[1]; 
        let filterArr = []; 
        for(let i = 0; i < ticketArr.length;i++){
            if(ticketArr[i].color == cc){
                filterArr.push(ticketArr[i]);
            }
        }
        
        const allticket = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < allticket.length; i++){
            allticket[i].remove();
        }
        for(let i = 0; i < filterArr.length;i++){
            let ticket = filterArr[i];
            let clr = ticket.color;
            let tsk = ticket.task;
            let id = ticket.id;
            manageTicket(tsk,clr,id);
        }
        
    })

    btnclr.addEventListener("dblclick",()=>{
        const allticket = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < allticket.length; i++){
            allticket[i].remove();
        }
        for(let i = 0; i < ticketArr.length;i++){
            let ticket = ticketArr[i];
            let clr = ticket.color;
            let tsk = ticket.task;
            let id = ticket.id;
            manageTicket(tsk,clr,id);
        }
    })


})











add_btn.addEventListener("click", () => {
    modal.classList.toggle("active")
})

let c = "black";

for (let i = 0; i < pty_btn.length; i++) {
    let prioritycolor = pty_btn[i];
    prioritycolor.addEventListener("click", () => {
        for (let j = 0; j < pty_btn.length; j++) {
            pty_btn[j].classList.remove("active");
        }
        prioritycolor.classList.add("active");
        c = prioritycolor.classList[0];
        console.log(c)
    })
}

modal.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        modal.classList.toggle("active");
        
        manageTicket(text_area.value, c);
        text_area.value = "";
    }
})

//Managing delAll button

const delall = document.querySelector(".fa-trash")
delall.addEventListener("click", () => {
    delall.classList.toggle("active");
})









function manageTicket(text, color,ticketId) {
    let id ;
    if(ticketId == undefined){
        id = uid();
    }
    else {
        id = ticketId;
    }

    let newTicket = document.createElement("div");
    newTicket.classList.add("ticket-cont");
    newTicket.innerHTML = `<div class="ticket-color ${color}"></div> 
                        <div class="ticket-id ">#${id}</div>
                        <div class="task-area" contentEditable="false">${text}</div> 
                        <div class="lock-unlock"><i class="fa fa-lock"></i></div>`
                        console.log(newTicket)
    main_cont.appendChild(newTicket);
    const tickets = main_cont.querySelectorAll(".ticket-cont");
    tickets.forEach(ticket => {
        ticket.addEventListener("click", () => {
            if (delall.classList.contains("active"))
                ticket.remove();
        })
    })

    //Managing color
    const ticketclr = newTicket.querySelector(".ticket-color");
    ticketclr.addEventListener("click",()=>{
        let currentcolor = ticketclr.classList[1];
        let currentcolorIdx = -1;
        for (let i = 0; i < colors.length; i++) {
            if (currentcolor === colors[i]) {
                currentcolorIdx = i;
                break;
            }
        }
        let nextColoridx = (currentcolorIdx + 1) % colors.length;
        let  nextcolor = colors[nextColoridx];
        ticketclr.classList.remove(currentcolor);
        ticketclr.classList.add(nextcolor);

    })
      
    //managing lock-unlock

const lock =  newTicket.querySelector(".fa-lock")
const task_area = newTicket.querySelector(".task-area")
lock.addEventListener("click",()=>{
    if(lock.classList.contains("fa-lock")){
        lock.classList.remove("fa-lock")
        lock.classList.add("fa-unlock");
        task_area.setAttribute("contentEditable","true")
        
    }else{
        lock.classList.remove("fa-unlock");
        lock.classList.add("fa-lock")
        task_area.setAttribute("contentEditable","false")
        
    }
})


if(ticketId === undefined){
ticketArr.push({"color":color,"task":text,"id":id});
}

}













