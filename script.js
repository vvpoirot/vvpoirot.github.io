async function fetchOncePage(idToShow) {
    let targetSection = document.getElementById(idToShow);

    if (!targetSection) {
        targetSection = document.createElement('div');
        targetSection.id = idToShow;				// Set div id
        targetSection.className = 'main-content';	// For CSS

        const bodyContent = document.querySelector('.body-content');
        if (bodyContent) {
            bodyContent.appendChild(targetSection);	// Append div to body-content div
        }

		// Fetch html file and put in the new div
        try {
            const response = await fetch(`pages/${idToShow}.html`);
            if (!response.ok) throw new Error(`Not found : pages/${idToShow}.html`);
            
            const htmlContent = await response.text();
            targetSection.innerHTML = htmlContent;
        } catch (error) {
            targetSection.innerHTML = `<p style="color: red;">Error : ${error.message}</p>`;
            console.error(error);
        }
    }

    showOncePage(idToShow);
}

function showOncePage(idToShow) {
    const sections = document.querySelectorAll('.main-content');
  
    sections.forEach(section => {
    	section.style.display = (section.id === idToShow) ? 'block' : 'none';
    });
  }

window.addEventListener('DOMContentLoaded', () => {
    if (!location.pathname.includes('project')) {
        console.log('load home page');
        fetchOncePage('home');
    }
});
