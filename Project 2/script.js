'use strict';

const modal = document.querySelector('.modal');
// console.log(modal)
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal =  document.querySelectorAll('.show-modal');
// console.log(btnsOpenModal);
  
for(let i=0; i<btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', function(){
        // console.log('Button clicked');
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        // modal.style.display = 'block';
    }); 
    
    const closeModal = function() {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
        // modal.style.display = 'none';
    }

    btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function(e){
        // console.log('key is pressed', e);
        if(e.key === 'Escape' && !modal.classList.contains('hidden')){
            closeModal();
        }
    })
    