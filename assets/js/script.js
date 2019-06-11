/* 
 * Classes
 */
class Popup {
    constructor(contentId){
        this.popupClass = Popup.popupClass();
        this.createDOM(contentId);
        this.addEvents();
    }
    createDOM(contentId){
        this.contentId = contentId;
        const contentElem = document.getElementById(contentId);
        
        // popup
        const elem = document.createElement('div');
        elem.className = this.popupClass+' window-centered';
        
        // overlay
        const overlayElem = document.createElement('div');
        overlayElem.className = this.popupClass+'-overlay';
        
        // close btn
        const closeBtnElem = document.createElement('a');
        closeBtnElem.className = this.popupClass+'-close-btn';
        closeBtnElem.innerHTML = '&times;';
        
        // append to DOM
        elem.appendChild(closeBtnElem);
        document.body.appendChild(overlayElem);
        document.body.appendChild(elem);
        
        // put content inside
        contentElem.parentNode.insertBefore(elem, contentElem);
        elem.appendChild(contentElem);
        
        this.elem = elem;
        this.overlayElem = overlayElem;
        this.closeBtnElem = closeBtnElem; 
    }
    static popupClass(){
        return 'popup';
    }
    static hideAll(){
        const popupClass = Popup.popupClass();
        const popupOverlayElems = document.getElementsByClassName(popupClass+'-overlay');
        for (let el of popupOverlayElems) {
            el.style.display = 'none';
        }
        const popupElems = document.getElementsByClassName(popupClass);
        for (let el of popupElems) {
            el.style.display = 'none';
        }
    }
    addEvents(){
        this.closeBtnElem.addEventListener('click',function(){
            Popup.hideAll();
        });
        this.overlayElem.addEventListener('click',function(){
            Popup.hideAll();
        });   
    }
    show(){
        this.elem.style.display = 'block';
        this.overlayElem.style.display = 'block';
    }
    hide(){
        this.elem.style.display = 'none';
        this.overlayElem.style.display = 'none';
    }
}
class User {
    constructor(name, surname, description, site_url, avatar_url){
        this.name    = name;
        this.surname = surname;
        this.description = description;
        this.site_url    = site_url;
        this.avatar_url  = avatar_url;
    }
}

/* 
 * Config
 */
const app_url = 'http://rkserv.hekko.pl/findgroup-form';
const endpoint_user_get = app_url + '/user/get/';
const endpoint_user_save_data = app_url + '/user/save-data/';
const endpoint_user_save_url  = app_url + '/user/save-url/';

// Make popup
const popup = new Popup('form');

function getUser(url, callback) {
    const method = 'post';

    var httpReq = new XMLHttpRequest();
    httpReq.open(method, url);
    httpReq.onreadystatechange = function () {
        if (httpReq.readyState === 4 && httpReq.status === 200) {
            const json = JSON.parse(httpReq.responseText);
            const userObj = new User(json.user_name, json.user_surname, json.user_description, json.user_site_url, json.user_avatar_url);

            httpReq = null;
            callback( userObj );
            return userObj;
        }
    };
    httpReq.send();
}

function initForm(settings){
    const form = document.getElementById('form');
    form.elements.namedItem('user_avatar_url').value = settings.user_avatar_url;
    form.addEventListener('submit',function(e){
       e.preventDefault();
       const newUser = new User();
       newUser.name        = form.elements.namedItem('user_name').value;
       newUser.surname     = form.elements.namedItem('user_surname').value;
       newUser.description = form.elements.namedItem('user_description').value;
       newUser.avatar_url  = form.elements.namedItem('user_avatar_url').value;
       newUser.site_url    = form.elements.namedItem('user_site_url').value;

        // Save User Data
        var userSaveData = fetch(settings.endpoint_user_save_data, {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                user_name: newUser.name, 
                user_surname: newUser.surname,
                user_description: newUser.description, 
                user_avatar_url: newUser.avatar_url
            })
        }).then(function(response){ 
            return response.json()
        });
        
        // Save User URL
        var userSaveUrl = fetch(settings.endpoint_user_save_url,{
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                user_site_url: newUser.site_url
            })          
        }).then(function(response){
             return response.json()
        });
        var combinedUserSaveResponse = {"userSaveData":{},"userSaveUrl":{}};
        
        Promise.all([userSaveData,userSaveUrl]).then(function(values){
            combinedUserSaveResponse["userSaveData"] = values[0];
            combinedUserSaveResponse["userSaveUrl"] = values[1];
            
            // Clear form
            form.reset();
            
            // Result
            popup.hide();
            
        });
        
    });
}

function initApp(user){
    showUserAvatar(user);
    const formSettings = {
        user_avatar_url : user.avatar_url,
        endpoint_user_save_data : endpoint_user_save_data,
        endpoint_user_save_url  : endpoint_user_save_url       
    };
    initForm(formSettings);
    showBtnPopup();
}

function showBtnPopup(){
    const btn = document.createElement('a');
    btn.innerText = 'Click me';
    btn.className = 'btn btn-primary window-centered';
    btn.addEventListener('click',function(){
        popup.show();
    });
    document.body.appendChild( btn );
}

function showUserAvatar(user){
    user instanceof User;

    // avatar 
    const avatarElem = document.createElement('div');
    avatarElem.classList.add('avatar');
    
    // link
    const avatarLinkElem = document.createElement('a');
    avatarLinkElem.setAttribute('href', user.site_url);
    
    // img
    const avatarImgElem = document.createElement('img');
    avatarImgElem.setAttribute('src', user.avatar_url);
    avatarImgElem.setAttribute('title', user.name);
    avatarLinkElem.appendChild( avatarImgElem );
    
    // append 
    avatarElem.appendChild( avatarLinkElem );
    document.body.appendChild( avatarElem );
}

window.addEventListener('DOMContentLoaded',function(){
    getUser(endpoint_user_get, initApp );
});