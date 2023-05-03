const joblistings = document.querySelector('.joblistings');
const input = document.querySelector('input');
const clear = document.querySelector('.clear');
const tags = document.querySelector('.tags');


const getJoblistings = function(callback){

    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", function (){
        let data = JSON.parse(request.responseText);
        if (request.readyState === 4 && request.status === 200) {
            callback(undefined, data);
        } else if(request.readyState === 4) {
            callback("can not fetch data", undefined);
        }
    });

    request.open("GET", "data.json");
    request.send();
}


getJoblistings((err, data) => {
    if(err) {
        console.log(err);
    } else if (data){         
        outputListings(data)
    }
})


function outputListings (data) {
    data.forEach(joblisting => {

        // checking if joblisting is NEW!
        function checkNew () {
            const  checkOutput = joblisting.new ? `<h6 class="new">NEW!</h6>` : '';
            return checkOutput;
        }

        // checking if joblisting is FEATURED
        function checkFeatured(){
            const featuredOutput = joblisting.featured ? `<h6 class="featured">FEATURED</h6>`: '';
            return featuredOutput;
        }

        // looping through the tools array
        function checktools(){
            let tool ='';
                for (let i = 0; i < joblisting.tools.length; i++) {
                    tool += `<h4 class="tag-joblisting">${joblisting.tools[i]}</h4>`;
                }
                return tool
            }

        // looping through the languages array
        function checkLanguages(){
        let language ='';
            for (let i = 0; i < joblisting.languages.length; i++) {
                language += `<h4 class="tag-joblisting">${joblisting.languages[i]}</h4>`;
            }
            return language
        }

    // output html
        let htmlbody = `
        <div class="joblisting">
            <div class="joblist-details">
                <img class="company-logo" src=${joblisting.logo} alt=${joblisting.company}>
                
                <div class="for-pc-only">
                    <div class="row">
                        <h6 class="company-name">${joblisting.company}</h6>
                        ${checkNew()}
                        ${checkFeatured()}
                    </div>
    
                    <h1 class="role">${joblisting.position}</h1>
                    <div class="joblist-timing">
                        <div>${joblisting.postedAt}</div>
                        <div>&#183;</div>
                        <div>${joblisting.contract}</div>
                        <div>&#183;</div>
                        <div>${joblisting.location}</div>
                    </div>
                </div>
            </div>
    
            <div class="joblisting-tags">
                <h4 class="tag-joblisting">${joblisting.role}</h4>
                <h4 class="tag-joblisting">${joblisting.level}</h4>
                ${checktools()}
                ${checkLanguages()}
            </div>
        </div>
        `
      joblistings.innerHTML += htmlbody;

    })
}


// To remove tag individually
tags.addEventListener('click', removeTag)

function removeTag(e) {
    const closeMark = e.target.closest('.fa-solid')
    if(closeMark){
        closeMark.parentElement.remove();
    }
}


// add tag
function addtag(inputValue){
    let addTag = `
    <div class="tag">
    <span class="role">${inputValue}</span>
    <i class="fa-sharp fa-solid fa-rectangle-xmark"></i>
    </div>
    `
    tags.innerHTML += addTag;
} 



// add eventlistener to inputfeild
input.addEventListener('change', filterJoblisting);

function filterJoblisting(){
    addtag(input.value);

    // get value of input
    let filterValue = document.querySelector('input').value.toLowerCase().trim();


    let joblistings = document.querySelectorAll('.joblisting');

    // looping through joblisting
    joblistings.forEach(joblisting => {
        let a = joblisting.children[1].children;
        joblisting.style.display = "none";

        // looping through tag in joblisting
        for (let i = 0; i < a.length; i++) {
           let x = a[i].innerText.toLowerCase();

        //    if matched
        filterValue === x ? joblisting.style.display = "" : "" ;
        }

        
        const tags = document.querySelector('.tags');

        // To clear all tags
        clear.addEventListener('click', clearAllTags);

        function clearAllTags(){
            tags.innerText = "";
            joblisting.style.display = "";  
        }
    })
    // reset input
    input.value = "";
}