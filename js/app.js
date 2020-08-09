/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: in-view.js
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

//?? ask or lookup which is better (global sections variable) vs (using document.querySelectorAll('section') twice )

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// build page content sections
function createSections(){
	//loop through services object from data.js
	services.forEach( service =>{
		//create a new section element
		const section = document.createElement('section');
		//set section id
		section.id= `${service.id}`;
		//set data attribute to use in populate nav
		section.setAttribute("data-nav", `${service.title}`);
		//set section content
		section.innerHTML = `
		<div class="landing__container">
			<h2> ${service.title} </h2>
			<div class="landing__container__content">
				<p> ${service.description} </p>
				<img src="${service.image}">
			</div>
		</div>`;
		//append section to view 
		const sectionsContainer = document.querySelector('.services__container');
		sectionsContainer.appendChild(section);
	})
}

//change nav links color when active
function toggleActive(el){
	el.classList.toggle("your-active-class")
	document.querySelector(`#${el.id}`).classList.toggle("your-active-class")
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
function populateNav(){
	const sections = document.querySelectorAll('section');
	const navBarList = document.querySelector('#navbar__list');
	//loop through sections to add its title to the nave
	sections.forEach(section=>{
		const navElement = document.createElement('li');
		navElement.innerHTML =  `<a href='#' id='${section.id}' class='menu__link'> ${section.dataset.nav} </a>`
		navBarList.appendChild(navElement) ;
	})
}


//Add class 'active' to section when near top of viewport
//* handeled by in-view.js 
function monitorSection(){
	//Set the ratio of an element's height and width that needs to be visible for it to be considered in viewport
	inView.threshold(0.75);
	for (i=1; i<=document.querySelectorAll('section').length; i++){
		inView(`#service${i}`)
		//add 'your-active-class' when section enters view port
	    .on('enter', toggleActive)
	    //remove 'your-active-class' when section enters view port
	    .on('exit', toggleActive);
	}
}


// Scroll to anchor ID using scrollTO event
function smoothScroll(evt){
	//check click event on the window to make sure its a click on nav links 
	if(evt.target.tagName === 'A'){
		evt.preventDefault();
		window.scrollTo({
		top: document.querySelector(`section#${evt.target.id}`).offsetTop,
		behavior: 'smooth'
	});

	}
}


/**
 * End Main Functions
 * Begin Events
 * 
*/
///////// Execution Starts Here /////////
// Build menu 
window.addEventListener('load', ()=>{
	//create page content
	createSections();
	//create nav bar
	populateNav();
	// monitor scrolling page
	monitorSection();
})

// Scroll to section on link click
window.addEventListener('click', smoothScroll);


