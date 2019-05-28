'use strict';

import {gallery, src} from './data.mjs';

window.onload = () =>{
    initGallery();
}

const initGallery = () =>{
    const panelsDiv = document.querySelector('.panels');
 
    gallery.forEach((element, index) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add(`panel`, `panel${index+1}`);
        wrapper.addEventListener('click', toggleOpen); // NOT toggleOpen() which will run on page load, instead give reference to function toggleOpen so that when panel is clicked the function is found and invoked

        wrapper.addEventListener("transitionend", toggleActive);

        /*
            or:
            const panels = document.querySelectorAll('.panel');
            panels.forEach(panel => addEventListener('click', toggleOpen));
        */
        
        for(let key in element){
            const paragraph = document.createElement('p');
            paragraph.innerText = element[key];
            wrapper.append(paragraph);
        }
        panelsDiv.append(wrapper);
        
    });

    for(let imageSrc in src){
        const panel = document.querySelector(`.${imageSrc}`);
        panel.style.backgroundImage = `url('${src[imageSrc]}')`
    }

    function toggleOpen(){
        this.classList.toggle('open');
    }

    function toggleActive(event){
        if(event.propertyName.includes("flex")){ // only care about the flex-grow transition to end (not the font-size transition)
            this.classList.toggle('open-active');
        }
    }
}