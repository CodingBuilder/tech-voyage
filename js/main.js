let settingIcon = document.querySelector(".setting-box .icon i");
let settingBox = document.querySelector(".setting-box");

function activeHandle(ev) {

  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {

    ele.classList.remove("active");

  });

  ev.target.classList.add("active");

}

if (settingIcon && settingBox) {
  settingIcon.addEventListener("click", () => {
    settingIcon.classList.toggle("fa-spin");
    settingBox.classList.toggle("show");
  });
}

let colors = document.querySelectorAll(
  ".setting-box .container .options .colors-list li"
);

colors.forEach((ele) => {
  if (window.localStorage.getItem("color")) {
    document.documentElement.style.setProperty(
      "--mainColor",
      window.localStorage.getItem("color")
    );
  }

  if (window.localStorage.getItem("color")) {
    if (
      window.getComputedStyle(ele).backgroundColor ==
      window.localStorage.getItem("color")
    ) {
      colors.forEach((el) => {
        el.classList.remove("active");
      });
      ele.classList.add("active");
    }
  }

  ele.addEventListener("click", (e) => {
    colors.forEach((el) => {
      el.classList.remove("active");
    });
    ele.classList.add("active");
    window.localStorage.setItem("color", e.currentTarget.dataset.color);
    document.documentElement.style.setProperty(
      "--mainColor",
      e.currentTarget.dataset.color
    );
  });
});

const landing = document.querySelector(".landing");
const randomBtns = document.querySelectorAll(".setting-box .container .options .action button");
let BGInterval;
let n = 1;
let randomBGCOption = true

// Loop On Each Button Of The Randomize BG Option Buttons
randomBtns.forEach((btn) => {

  // Check If The Local Storage Has The Item "randomize"
  if (window.localStorage.getItem("randomize")) {
    // Check If The DataSet Of The Button Equals To The Local Storage Item "randomize" Value
    if (btn.dataset.randomize === window.localStorage.getItem("randomize")) {
      // Loop On Each Button Again And Remove The Class "active" From Every Button
      randomBtns.forEach((optionBtn) => { optionBtn.classList.remove("active") });
      btn.classList.add("active");
      // Check If The DataSet Of The Button Is "yes" Start The changeBG Function
      if (btn.dataset.randomize === "yes") {
        changeBG()
      // If Not Clear The ChangeBG Interval
      } else {
        randomBGCOption = false;
        clearInterval(BGInterval);
      }
    }
  }

  btn.addEventListener("click", function(e) {
    activeHandle(e);
    window.localStorage.setItem("randomize", e.currentTarget.dataset.randomize);

    if (e.target.dataset.randomize === "yes") {
      BGInterval = true;
      changeBG()
    } else {
      randomBGCOption = false;
      clearInterval(BGInterval);
    }

  });
});

// Change the background image at interval
function changeBG() {
  if (randomBGCOption === true) {
    BGInterval = setInterval(() => {
      landing.style.opacity = "0.2";

      setTimeout(() => {
        n = n > 4 ? 1 : n + 1; // Reset n If It Exceeds 4 And Increase It If Not
        landing.style.backgroundImage = `url("../images/background${n}.jpg")`;
        landing.style.opacity = "1";
      }, 1000);
    }, 7000);
  } else {
    clearInterval(BGInterval); // Stop the interval if randomBGCOption is false
  }
}

let fonts = document.querySelectorAll(".setting-box .container .options .fonts-list li button");

fonts.forEach((font) => {
  font.style.fontFamily = font.dataset.font;

  if (window.localStorage.getItem("font")) {
    if (font.dataset.font === window.localStorage.getItem("font")) {
      fonts.forEach((fontBtn) => { fontBtn.classList.remove("active") });
      font.classList.add("active");
    }
    document.body.style.fontFamily = window.localStorage.getItem("font");
  }

  font.addEventListener("click", (e) => {
    fonts.forEach((fontBtn) => { fontBtn.classList.remove("active") });
    e.currentTarget.classList.add("active");
    document.body.style.fontFamily = e.currentTarget.dataset.font;
    window.localStorage.setItem("font", e.currentTarget.dataset.font);
  });
});

let bulletsBtns = document.querySelectorAll(".setting-box .container .options .bullets-action button");
let navBullets = document.querySelector(".nav-bullets")

bulletsBtns.forEach((btn) => {

  if (window.localStorage.getItem("bulletsShow")) {
    if (btn.dataset.show === window.localStorage.getItem("bulletsShow")) {
      bulletsBtns.forEach((bulletBtn) => {
        bulletBtn.classList.remove("active");
      });
      btn.classList.add("active");
      navBullets.style.display = window.localStorage.getItem("bulletsShow") === "yes" ? "block" : "none";
    }
  }

  btn.addEventListener("click", (e) => {
    activeHandle(e);
    navBullets.style.display = e.currentTarget.dataset.show === "yes" ? "block" : "none";
    window.localStorage.setItem("bulletsShow", e.currentTarget.dataset.show);
  });
});

document.querySelector(".setting-box .container .reset").addEventListener("click", () => {

  window.localStorage.removeItem("color");
  window.localStorage.removeItem("randomize");
  window.localStorage.removeItem("font");
  window.localStorage.removeItem("bulletsShow");

  window.location.reload();

});

let listIcon = document.querySelector(".burger-icon");
let list = document.querySelector("header ul");
let listEle = document.querySelectorAll("header ul li");

// Loop On Every Li On the List
listEle.forEach((ele) => {
  // Add The Click Event For Every Li
  ele.addEventListener("click", () => {
    // Loop Again And Remove The Class "active" From Every Li
    listEle.forEach((el) => {
      el.classList.remove("active");
    });
    // Add The Class "active" To The Clicked Li
    ele.classList.add("active");
  });
});

document.addEventListener("click", function (e) {
  if (window.getComputedStyle(listIcon).display !== "none") {
    if (listIcon.contains(e.target)) {
      listIcon.classList.toggle("clicked");
    } else if (!list.contains(e.target)) {
      listIcon.classList.remove("clicked");
    }

    if (listIcon.classList.contains("clicked")) {
      list.classList.add("show");
      setTimeout(() => {
        list.style.opacity = "1";
      }, 300);
    } else {
      list.style.opacity = "0";
      setTimeout(() => {
        list.classList.remove("show");
      }, 300);
    }
  } else {
    list.style.opacity = "1";
  }
});

// Add The Event resize To The Window Object
window.addEventListener("resize", () => {
  // Check If The Display Of The Burger Icon Is None
  if (window.getComputedStyle(listIcon).display === "none") {
    // If None Show The List
    list.style.opacity = "1";
    list.classList.add("show");
  } else {
    // If Not Check If The Burger Icon Doesn't Contain The "clicked" Class
    if (!listIcon.classList.contains("clicked")) {
      // If True Hide The List
      list.style.opacity = "0";
      list.classList.remove("show");
    }
  }
});

let skills = document.querySelector('.skills .container');

window.addEventListener("scroll", () => {
  let skillsOffsetTop = skills.offsetTop;

  let skillsHeight = skills.offsetHeight;

  let windowHeight = window.innerHeight;

  let scrollTop = window.pageYOffset;

  if (scrollTop > (skillsOffsetTop + skillsHeight - windowHeight)) {
    let skillsProgress = document.querySelectorAll(".skills .container .skill-box div span");
    skillsProgress.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
});

let imgs = document.querySelectorAll(".gallery .container .gallery-box img");
let totalImgs = 10;

imgs.forEach((img) => {

  img.addEventListener("click", function(e) {

    // Create An Overlay When An Image Is Clicked
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "overlay";

    document.body.appendChild(popupOverlay);

    // Create The Popup That The Image Will Show Inside It
    let popup = document.createElement("div");
    popup.className = "popup";

    // Create The Popup Image
    let popupImg = document.createElement("img");
    popupImg.src = img.src;

    popup.appendChild(popupImg);
    
    // Create The Close Button
    let closeBtn = document.createElement("div");
    closeBtn.textContent = "X";
    closeBtn.className = "close-btn";
    
    popup.appendChild(closeBtn);

    let next = document.createElement("div");
    next.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
    next.className = "next";
    popup.appendChild(next);
    
    next.addEventListener("click", () => {
      if (!popupImg) return;
    
      let match = popupImg.src.match(/(\d+)(?=\.\w+$)/);
      if (!match) return;
    
      let currentImgNumber = match[0];
      let nextImgNumber = String(parseInt(currentImgNumber) + 1).padStart(currentImgNumber.length, "0");
    
      if (parseInt(nextImgNumber) > totalImgs) {
        nextImgNumber = "01";
      }
    
      let newSrc = popupImg.src.replace(/(\d+)(?=\.\w+$)/, nextImgNumber);
      popupImg.src = newSrc;
    
      console.log(nextImgNumber);
    });
    
    
    
    let previous = document.createElement("div");
    previous.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
    previous.className = "previous";
    popup.appendChild(previous);

    previous.addEventListener("click", () => {
      if (!popupImg) return;
    
      let match = popupImg.src.match(/(\d+)(?=\.\w+$)/);
      if (!match) return;
    
      let currentImgNumber = match[0];
      let nextImgNumber = String(parseInt(currentImgNumber) - 1).padStart(currentImgNumber.length, "0");
    
      if (parseInt(nextImgNumber) < 1) {
        nextImgNumber = String(totalImgs);
      }
    
      popupImg.src = popupImg.src.replace(/(\d+)(?=\.\w+$)/, nextImgNumber);
    });

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.top = "50%";
    }, 0)
});
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-btn") {
    document.querySelector(".popup").remove();
    document.querySelector(".overlay").remove();
  }
})

navBullets = document.querySelector(".nav-bullets");
let sections = document.querySelectorAll("[data-type='section']");

sections.forEach((sec) => {

  // Create The Bullet
  let bullet = document.createElement("div");
  bullet.className = "bullet";

  bullet.setAttribute("data-scroll", `.${sec.className}`);

  bullet.addEventListener("click", (e) => {
    
    document.querySelector(e.target.dataset.scroll).scrollIntoView({
      behavior: "smooth"
    })
  });
  // Create The ToolTip Of The Bullet
  let bulletSection = document.createElement("div");
  bulletSection.className = "tooltip";

  // Create The ToolTip Title
  let sectionTitle = "";
  for (let i = 0; i < sec.className.length; i++) {
    sectionTitle += i === 0 ? sec.className[i].toUpperCase() : sec.className[i];
  }

  bulletSection.textContent = sectionTitle;

  // Append The Created Elements
  bullet.appendChild(bulletSection);
  navBullets.appendChild(bullet);

});

let contact = document.forms[0];

contact.addEventListener("submit", (e) => {
  let userName = document.querySelector("[name='userName']");
  let userRe = /.{6,15}/i;

  if (userRe.test(userName.value) === false) {
    userName.previousElementSibling.style.display = "block";
    e.preventDefault();
  } else {
    userName.previousElementSibling.style.display = "none";
  }

  let phone = document.querySelector("[name='phone']");
  let phoneRe = /\d{11}/ig;

  if (phoneRe.test(phone.value) === false) {
    phone.previousElementSibling.style.display = "block";
    e.preventDefault();
  } else {
    phone.previousElementSibling.style.display = "none";
  }

  let email = document.querySelector("[name='email']");
  let emailRe = /.+@\w+\.\w{2,}/ig;

  if (emailRe.test(email.value) === false) {
    email.previousElementSibling.style.display = "block";
    e.preventDefault();
  } else {
    email.previousElementSibling.style.display = "none";
  }
  let subject = document.querySelector("[name='subject']");
  let subjectRe = /\w{2,}/ig;

  if (subjectRe.test(subject.value) === false) {
    subject.previousElementSibling.style.display = "block";
    e.preventDefault();
  } else {
    subject.previousElementSibling.style.display = "none";
  }

  let msg = document.querySelector("[name='msg']");
  let msgRe = /\w{2,}/i;

  if (msgRe.test(msg.value) === false) {
    msg.previousElementSibling.style.display = "block";
    e.preventDefault();
  } else {
    msg.previousElementSibling.style.display = "none";
  }

});

let upArrow = document.querySelector(".up");
let about = document.querySelector(".about");

window.addEventListener("scroll", () => {
  let aboutOffsetTop = about.offsetTop;

  let aboutHeight = about.offsetHeight;

  let windowHeight = window.innerHeight;

  let scrollTop = window.pageYOffset;

  if (scrollTop > (aboutOffsetTop + aboutHeight - windowHeight)) {

    upArrow.classList.add("show");

    upArrow.addEventListener("click", (e) => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

  } else {

    upArrow.classList.remove("show");

  }
});