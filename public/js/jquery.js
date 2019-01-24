//nice scroll//

(function() {
  $(document).ready(function() {
    $(".navbar .list .list__item a").click(function(e) {
      e.preventDefault();
      var name = "#" + $(this).attr("data-scroll");
      $("html, body").animate(
        {
          scrollTop: $(name).offset().top
        },
        2500
      );
    });

    //menu
    $(".menu-section .menu .menu-list .menu-list__item a").click(function(e) {
      e.preventDefault();
      $(".menu__btn").click();
      $("#click").attr("checked", false);

      var name = "#" + $(this).attr("data-scroll");

      $("html, body").animate(
        {
          scrollTop: $(name).offset().top + 1
        },
        2500
      );
    });
  });
})();

////MVC////

var viewControl = (function() {
  let type = "All";

  var createButton = (
    page,
    type //next or prev
  ) =>
    `<a href="#home" class="btn__forth" data-goto="${
      type === "next" ? page + 1 : page - 1
    }">
       <img src="./img/arrow.png" alt="arrow" class="btn__arrow">
        </a>`;

  var renderButton = function(page, numberOfElements, limit) {
    let pages = Math.ceil(numberOfElements / limit);
    console.log(numberOfElements, limit);
    console.log(page, pages);
    let button;

    if (page > 1 && page < pages) {
      button = `${createButton(page, "prev")} ${createButton(page, "next")}`;
    } else if (page == 1 && pages > 1) {
      button = createButton(page, "next");
    } else if (page == pages && pages > 1) {
      button = createButton(page, "prev");
    }
    if (button) return button;
    return false;
  };
  var addButton = function(place, button) {
    if (button)
      document.querySelector(place).insertAdjacentHTML("beforeEnd", button);
  };
  var pagination = function(list, page = 1, limit = 6, type) {
    let start = (page - 1) * limit;
    let end = page * limit;

    //console.log(list);
    const btn = renderButton(page, list.length, limit);
    if (type === "project") {
      addButton(".buttons", btn);
    } else {
      addButton(".certificates .buttons", btn);
    }
    console.log(type, btn);
    list = list.slice(start, end);
    return list;
  };

  return {
    DOMStrings: {
      navBarItem: ".projects .nav-tab",
      gridLab: ".projects .grid",
      navBarItemCertificates: ".certificates .nav-tab",
      box: ".box"
    },
    findType: function(e) {
      const ele = e.target.closest(".list__item");
      type = ele.dataset.type;
    },
    getListType: function() {
      return type;
    },
    clearScreen: function() {
      document.querySelector(this.DOMStrings.gridLab).innerHTML = "";
      document.querySelector(".buttons").innerHTML = "";
    },
    clearCertificate: function() {
      document.querySelector(this.DOMStrings.box).innerHTML = "";
      document.querySelector(".certificates .buttons").innerHTML = "";
    },

    displayProjects: function(list, page) {
      list = pagination(list, page, 6, "project");
      list.forEach(ele => {
        let HtmlElement = `<div class="grid__cell grid__cell--1 ">
                 <img src="${
                   ele.imgHref
                 }" alt="project1" class="projects__img ">
                     <div class="caption1">
                         <a href="${
                           ele.link
                         }" class="btn__tertiary margin-bottom-u-b">
                             see it
                         </a>
                         <p class="caption1__text1">
                             ${ele.descrption}
                         </p>
                     </div>
                  </div>`;
        document
          .querySelector(this.DOMStrings.gridLab)
          .insertAdjacentHTML("beforeEnd", HtmlElement);
      });
    },
    displayCertificates: function(list, page) {
      console.log("here" + page);
      list = pagination(list, page, 2, "cert");
      list.forEach((ele, ind) => {
        let HtmlElement = `<div class="box__item margin-bottom-u-s">
                <div class="box__img-container">
                    <img src="${ele.imgHref}" class="box__img">
                    <div class="box__caption">
                        <h1 class="caption__text">${ele.name}</h1>
                    </div>
                </div>
                <div class="box__details">
                    <h2 class="heading-2">
                       ${ele.name}
                    </h2>
                    <p class="paragraph">
                    ${ele.descrption}
                    </p>
                </div>
            </div>`;
        document
          .querySelector(this.DOMStrings.box)
          .insertAdjacentHTML("beforeEnd", HtmlElement);
      });
    }
  };
})();

var modelControl = (function() {
  const projects = {
    types: {
      photoshop: [],
      template: [],
      meanStack: [],
      other: []
    }
  };

  const certificates = {
    types: {
      studying: [],
      languages: [],
      religion: []
    }
  };

  var Project = function(name, type, tools, descrption, imgHref, link = "") {
    this.name = name;
    this.type = type;
    this.tools = tools;
    this.descrption = descrption;
    this.imgHref = imgHref;
    this.link = link;
  };

  var Certificate = function(name, type, descrption, imgHref) {
    this.name = name;
    this.type = type;
    this.descrption = descrption;
    this.imgHref = imgHref;
  };

  let cert = new Certificate(
    "ICDL",
    "studying",
    `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error asperiores consectetur ratione, reprehenderit perspiciatis
    quidem quod. Soluta, suscipit? Eos minima ea minus officia. Excepturi a quod voluptates!
    Esse, mollitia nisi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
    quae!`,
    "./img/certif--1.png"
  );
  certificates.types.studying.push(cert);
  cert = new Certificate(
    "DBMS",
    "studying",
    `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error asperiores consectetur ratione, reprehenderit perspiciatis
    quidem quod. Soluta, suscipit? Eos minima ea minus officia. Excepturi a quod voluptates!
    Esse, mollitia nisi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
    quae!`,
    './img/certif--3.png"'
  );
  certificates.types.studying.push(cert);
  cert = new Certificate(
    "design",
    "studying",
    `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error asperiores consectetur ratione, reprehenderit perspiciatis
    quidem quod. Soluta, suscipit? Eos minima ea minus officia. Excepturi a quod voluptates!
    Esse, mollitia nisi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
    quae!`,
    "./img/certif--1.png"
  );
  certificates.types.languages.push(cert);

  let pro = new Project(
    "photoshop",
    "1/1/2017",
    "html css sass",
    "web design 1/1/2017",
    "./img/pro1.jpg"
  );
  projects.types.photoshop.push(pro);
  pro = new Project(
    "photoshop",
    "photoshop",
    "html css sass",
    "web design 5/1/2017",
    "./img/pro2.jpg"
  );
  projects.types.photoshop.push(pro);
  pro = new Project(
    "photoshop",
    "photoshop",
    "html css sass",
    "web design 2/3/2017",
    "./img/pro3.jpg"
  );
  projects.types.photoshop.push(pro);
  new Project(
    "photoshop",
    "photoshop",
    "html css sass",
    "web design 1/5/2017",
    "./img/pro4.jpg"
  );
  projects.types.photoshop.push(pro);
  pro = new Project(
    "photoshop",
    "photoshop",
    "html css sass",
    "web design 8/8/2017",
    "./img/pro5.jpg"
  );
  projects.types.photoshop.push(pro);
  pro = new Project(
    "photoshop",
    "photoshop",
    "html css sass",
    "web design 1/10/2017",
    "./img/pro7.jpg"
  );
  projects.types.photoshop.push(pro);
  pro = new Project(
    "photoshop",
    "photoshop",
    "1/1/2018",
    "abdulfattah",
    "./img/pro8.jpg"
  );
  projects.types.photoshop.push(pro);

  pro = new Project(
    "photoshop",
    "photoshop",
    "html css sass",
    "5/5/2018",
    "./img/pro10.jpg"
  );
  projects.types.photoshop.push(pro);
  pro = new Project(
    "photoshop",
    "photoshop",
    "html css sass",
    "1/12/2018",
    "./img/projetcs__img--5.png"
  );
  projects.types.photoshop.push(pro);

  pro = new Project(
    "meanStack",
    "meanStack",
    "html css sass",
    "Quiz maker",
    "./img/meanStack-1.jpg",
    "https://quizmaker1.herokuapp.com"
  );
  projects.types.meanStack.push(pro);
  pro = new Project(
    "meanStack",
    "meanStack",
    "angular and node.js",
    "Alsaraha",
    "./img/alsaraha.png",
    "https://stark-dusk-63708.herokuapp.com"
  );
  projects.types.meanStack.push(pro);
  pro = new Project(
    "meanStack",
    "meanStack",
    "angular and node.js",
    "social network",
    "./img/meanStack-3.jpg",
    "https://socialnetwork3.herokuapp.com"
  );
  projects.types.meanStack.push(pro);

  pro = new Project(
    "templates",
    "templates",
    "html css sass",
    "abdulfattah",
    "./img/pro0.jpg",
    "https://profolio1.herokuapp.com/project/0"
  );
  projects.types.template.push(pro);

  pro = new Project(
    "template",
    "template",
    "html && css && bootstrap",
    "1/1/2017",
    "./img/pro5.jpg",
    "https://profolio1.herokuapp.com/project/2"
  );
  projects.types.template.push(pro);

  pro = new Project(
    "template",
    "template",
    "angular and node.js",
    "1/10/2017",
    "./img/pro4.jpg",
    "https://profolio1.herokuapp.com/project/3"
  );
  projects.types.template.push(pro);

  pro = new Project(
    "template",
    "template",
    "angular and node.js",
    "1/10/2017",
    "./img/pro3.jpg",
    "https://profolio1.herokuapp.com/project/4"
  );
  projects.types.template.push(pro);

  pro = new Project(
    "template",
    "template",
    "angular and node.js",
    "1/10/2017",
    "./img/pro2.jpg",
    "https://profolio1.herokuapp.com/project/5"
  );
  projects.types.template.push(pro);

  pro = new Project(
    "template",
    "template",
    "angular and node.js",
    "1/10/2017",
    "./img/pro1.jpg",
    "https://profolio1.herokuapp.com/project/6"
  );
  projects.types.template.push(pro);

  pro = new Project(
    "template",
    "template",
    "angular and node.js",
    "1/10/2017",
    "./img/pro7.jpg",
    "https://profolio1.herokuapp.com/project/1"
  );
  projects.types.template.push(pro);

  return {
    getCertificateList: function(type) {
      return certificates.types[type];
    },
    getProjectsList: function(type) {
      return projects.types[type];
    },
    addProjects: function() {
      const name = prompt("enter the name of the project: ");
      const type = prompt("enter the type of the project: ");
      const tool = prompt(
        "enter the tools that you used to make this project: "
      );
      const descrption = prompt("what do you wanna say about this project? ");
      const URL = prompt("what is the url for this photo ");
      let project = new Project(name, type, tool, descrption, URL);

      projects.types[type].push(project);
    },
    getAllProjects: function() {
      var T1 = projects.types.meanStack,
        T2 = projects.types.template,
        T3 = projects.types.photoshop;

      var T = T1.concat(T2, T3);
      return T;
    },
    getAllCertificates: function() {
      var T1 = certificates.types.religion,
        T2 = certificates.types.languages,
        T3 = certificates.types.studying;
      var T = T1.concat(T2, T3);
      return T;
    }
  };
})();

var Controller = (function(UICtrl, MCtrl) {
  const DOMSrings = UICtrl.DOMStrings;
  let element;
  let page1 = 1;
  let page2 = 1;
  const limit = 6;
  var eventListener = function() {
    document
      .querySelector(DOMSrings.navBarItem)
      .addEventListener("click", e => {
        e.preventDefault();
        if (e) {
          UICtrl.findType(e);
          page1 = 1;
          changeTheContent();
        }
      });

    document
      .querySelector(DOMSrings.navBarItemCertificates)
      .addEventListener("click", e => {
        e.preventDefault();
        if (e) {
          UICtrl.findType(e);
          page2 = 1;
          changeCertificates();
        }
      });

    document.querySelector(".buttons").addEventListener("click", e => {
      console.log(e);
      e.preventDefault();
      page1 = parseInt(e.target.closest(".btn__forth").dataset.goto);
      changeTheContent();
    });

    document
      .querySelector(".certificates .buttons")
      .addEventListener("click", e => {
        console.log(e);
        e.preventDefault();
        page2 = parseInt(e.target.closest(".btn__forth").dataset.goto);
        changeCertificates();
      });
  };

  let preType1;
  let preType2;
  var changeTheContent = function() {
    let list;
    const type = UICtrl.getListType();
    console.log(type);
    if (type !== preType1) {
      preType1 = type;
      page1 = 1;
    }
    if (type === "All") list = MCtrl.getAllProjects();
    else list = MCtrl.getProjectsList(type);
    UICtrl.clearScreen();
    UICtrl.displayProjects(list, page1);
  };

  var changeCertificates = function() {
    let list;
    const type = UICtrl.getListType();
    if (type !== preType2) {
      preType2 = type;
      page2 = 1;
    }
    if (type === "All") list = MCtrl.getAllCertificates();
    else list = MCtrl.getCertificateList(type);
    UICtrl.clearCertificate();
    UICtrl.displayCertificates(list, page2);
  };
  return {
    init: function() {
      changeTheContent();
      changeCertificates();
      eventListener();
    }
  };
})(viewControl, modelControl);

Controller.init();
