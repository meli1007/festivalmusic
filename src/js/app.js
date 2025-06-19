document.addEventListener('DOMContentLoaded', function() {

    navigationFixed()
    createGallery()
    highlightLink()
    scrollNav()
})

function navigationFixed() {
    const header = document.querySelector('.header')
    const aboutFestival = document.querySelector('.about-festival')

    document.addEventListener('scroll', function() {
        //se ve si ya se dio scroll suficiente para que pase una seccion
        if(aboutFestival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

function createGallery() {
    
    const AMOUNT_IMAGES = 16

    const gallery = document.querySelector('.gallery-images');

    for(let i = 1; i <= AMOUNT_IMAGES; i++) {
        const images = document.createElement('PICTURE');
        images.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;
        /*const images = document.createElement('IMG');
        images.loading = 'lazy'
        images.width = "300"
        images.height = "200"
        images.src= `src/img/gallery/thumb/${i}.jpg`
        images.alt = 'Images Gallery'*/
        

        //Event Handler
        images.onclick = function() {
            showImage(i)
        }

        gallery.appendChild(images)
    }
}

function showImage(i) {
    const images = document.createElement('PICTURE');
    images.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;
    //const images = document.createElement('IMG');
    // images.src= `src/img/gallery/full/${i}.jpg`
    // images.alt = 'Images Gallery'

    //Modal generator
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = closeModal

    //Button close modal
    const closeModalBtn = document.createElement('BUTTON')
    closeModalBtn.textContent = 'X'
    closeModalBtn.classList.add('btn-close')
    closeModalBtn.onclick = closeModal
    
    modal.appendChild(images)
    modal.appendChild(closeModalBtn)
    

    //Add to HTML
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
    

}

function closeModal() {
    
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out')

    setTimeout(() => {
        //if modal exist, then delete
        modal?.remove()

        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500);
    
    
}

function highlightLink() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.principal-navigation a')
        
        let actual = '';
        sections.forEach( section => {
            //offsetTop detecta la distancia de la parte superior con el body
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            //  /3 para resaltar la seccion actual 
            if(window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id
            }
        })
        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.principal-navigation a')

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}