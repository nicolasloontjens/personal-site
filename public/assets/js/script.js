"use strict";

document.addEventListener("DOMContentLoaded",init);
let currentWork = 0;
let workArray = [];
let interval;

async function init(){
    await registerServiceWorker();
    await fillWork();
    interval = setInterval(function(){
        workForward(null);
    },10000);
    document.querySelector("#work-back").addEventListener("click",workBack);
    document.querySelector("#work-forward").addEventListener("click",(e) => {
        clearInterval(interval);
        workForward(e);
    });
}

async function fillWork(){
    const data = await fetch("./assets/data/work.json");
    const array = await data.json();
    workArray = array;
    displayWork();
}

function displayWork(){
    let workpiece = workArray[currentWork];
    let workdiv = document.querySelector("#current-work");
    workdiv.innerHTML = "";
    let html = `
    <div>
    <h1 class="gradient">My Work</h1>
    <h2>${workpiece.title}</h2>
    <h3>${workpiece.description}</h3>
    <p>Category: ${workpiece.category}</p>
    `;
    if(workpiece.grade!=null) html += `<p>Grade: ${workpiece.grade}</p>`;
    if(workpiece.link!=null) html += `<a href="${workpiece.link}" class="gradient" target="_blank" rel="noopener noreferrer">Project link</a>`;
    if(workpiece.repository!=null) html += `<a href="${workpiece.repository}" class="gradient" target="_blank" rel="noopener noreferrer">Github repository</a>`;
    html += "</div>"
    workdiv.innerHTML += html;
}

function workBack(e){
    if(currentWork <= 0){
        currentWork = workArray.length - 1;
        displayWork();
        return;
    }
    currentWork--;
    displayWork();
}

function workForward(e){
    if(e!==null) e.preventDefault();
    clearInterval(interval);
    if(currentWork >= (workArray.length -1)){
        currentWork = 0;
        displayWork();
        return;
    }
    currentWork++;
    displayWork();
}

async function registerServiceWorker(){
    if('serviceWorker' in navigator){
        await navigator.serviceWorker.register("/sw.js");
    }
}