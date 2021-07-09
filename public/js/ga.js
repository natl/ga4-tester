function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function openModal() {
    // document.getElementById("backdrop").style.display = "block"
    document.getElementById("gtmModal").style.display = "block"
    document.getElementById("gtmModal").classList.add("show")
}
function closeModal() {
    // document.getElementById("backdrop").style.display = "none"
    document.getElementById("gtmModal").style.display = "none"
    document.getElementById("gtmModal").classList.remove("show")
}

// actual code to run on DOM loaded
// document.addEventListener("DOMContentLoaded", function(event) { 
    if (getCookie('gtm') === null) {
        // prompt for GTM cookie
        const div = document.createElement('div');
        div.id = "gtmModal";
        div.classList.add('modal-bg');
        div.innerHTML = `
        <div class="modal">
            <p>Enter GTM Code</p>
            <input id="gtm-code" type="text" />
            <input id="gtm-submit" type="button" value="Submit"/>
        </div>
        `;
        document.body.appendChild(div);
        const gtm_code = document.getElementById('gtm-code');
        const gtm_submit = document.getElementById('gtm-submit');
        gtm_submit.addEventListener('click', function () {
            setCookie('gtm', gtm_code.value, 7);
            location.reload();
        });
        openModal();
    } else {
        // cookie exists
        const gtm_code = getCookie('gtm');
        // script.innerHTML = `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',gtm_code);
    const noscript = document.createElement('noscript');
    noscript.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id="' + gtm_code + 'height="0" width="0" style="display:none;visibility:hidden"></iframe>';
    document.body.insertBefore(noscript, document.body.firstChild);

    }

//   });