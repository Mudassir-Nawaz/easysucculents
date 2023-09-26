// Console log
console.log("Welcome to Console");

// Cuando carga, pone los colores de la Navbar de forma distina en función de si estamos en móviles o no.

// Para cuando estamos en ordenador: El navbar cambia de color y sombra en función del scroll.
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (window.scrollY == 0){
    var shadow = "0 4px 6px -7px rgba(34,34,34," + (window.scrollY*2)/100 + ")"
  }  else {
    var shadow = "0 4px 6px -7px rgba(34,34,34,1)"
  }
  document.getElementById("main-navbar").style.boxShadow = shadow;
}


// Overlay for mobile. Cuando se da al botón, se pone el overlay. Es una copia de C&R Overlay, pero cambiando los id.
$("#navbarButtonXs").click(function(e) {
  console.log("xsss")
  e.preventDefault();
  // Esto es para el overlay. Hay un div (id= overlaydiv) que cuando le meto la clase overlay, se pone gris. Lo hice viendo este tutorial: https://tympanus.net/codrops/2013/11/07/css-overlay-techniques/
  $("#overlaydiv").toggleClass("overlay");
  // Además hay que poner la altura del overlay, que será la misma que la altura de toda la página
  // Así saco la altura: https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
  var totalheight = document.documentElement.scrollHeight + "px"
  // Y si quito la clase, quito también la altura. Porque sino se queda todo blanco al quedar el overlay con altura. Sería algo así como un toggleCSS, pero no existe eso. Así que me he inventado ese if.
  if ( $('#overlaydiv').hasClass('overlay') ) {
      $("#overlaydiv").css("height", totalheight);
  } else {
      $("#overlaydiv").css("height", '0px');
  }
});

// Contact Form Validation
// https://getbootstrap.com/docs/4.0/components/forms/#validation
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


// Filters posts
// Esta función se ejecuta oninput. Es decir, cada vez que se escribe en el input.
function searchPosts(){
  // Primer añado un d-none a todos los posts. Todos se ocultan.
  $('.postCol').addClass('d-none');
  // Y quito todos los tags o categories que no están activos
  $('.tag-button-tagpage2').removeClass('active');
  // Además tengo que quitar algo si se ha buscado vía input.
  var tagButtons = document.getElementsByClassName("tag-button-tagpage");
  for (var i = tagButtons.length - 1; i >= 0; i--) {
    tagButtons[i].classList.remove("active")
  }
  // Encuentro la palabra que se ha introducido en el input, y la pongo en minúsculas.
  var filterInput = document.getElementById("filterInput").value
  var filterInputLowercase = filterInput.toLowerCase()
  // Saco un array con todos los posts (tienen cityCol como clase). 
  var posts = document.getElementsByClassName("postCol");
  // Hago un loop por todos esos posts.
  var results = 0;
  for(var i = 0; i < posts.length; i++){
    // Para cada post saco el id (que realmente es el título del post) y lo pongo en minúsculas.
    var postid = posts[i].id
    var postidLowerCase = postid.toLowerCase();
    // Si, el texto introducido en el input, está contenido en el id (que es el título), elimino el d-none y vuelve a aparecer.
    if(postidLowerCase.includes(filterInputLowercase)){
      document.getElementById(posts[i].id).classList.remove("d-none")
      results += 1
    }
  }
  // Cuento el result
  resultCount(results);
}

// Slugify a string. Lo saqué de aquí: https://lucidar.me/en/web-dev/how-to-slugify-a-string-in-javascript/
// Se utiliza en searchPostsByTagOrCat
function slugify(str)
{
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '') 
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-') 
    // Collapse dashes
    .replace(/-+/g, '-'); 

    return str;
}

// Filters posts by tag y category. Pero no es el que se usa en /tags. Es el de blog.
// Esta función se ejecuta on click (después de pasar hasBeenClicked)
function searchPostsByTagOrCat(key, tagORcat){
  // Primer añado un d-none a todos los posts. Todos se ocultan.
  $('.postCol').addClass('d-none');
  // Además tengo que quitar algo si se ha buscado vía input.
  document.getElementById("filterInput").value = null
  // Saco un array con todos los posts (tienen postCol como clase). 
  var posts = document.getElementsByClassName("postCol");
  // Hago un loop por todos esos posts.
  var results = 0;
  // Hago un slugify de los keys (o daba un error por los acentos)
  var slugkey = slugify(key)
  // Si es un tag:
  if(tagORcat == "tag") {
    for(var i = 0; i < posts.length; i++){
      // Para cada post saco los tags, pero en slug (porque los key, se envían en slug)
      var postTags = slugify(posts[i].dataset.tags)
      // Si, el key está contenido en los tags, elimino el d-none y vuelve a aparecer.
      if(postTags.includes(slugkey)){
        document.getElementById(posts[i].id).classList.remove("d-none")
        results += 1
      }
    }
  }
  // Si es un cat:
  console.log(key)
  if(tagORcat == "cat") {
    for(var i = 0; i < posts.length; i++){
      // Para cada post saco los cat, pero en slug (porque los key, se envían en slug)
      var postCategories = slugify(posts[i].dataset.categories)
      console.log(postCategories)
      // Si, el key está contenido en los tags, elimino el d-none y vuelve a aparecer.
      if(postCategories.includes(slugkey)){
        document.getElementById(posts[i].id).classList.remove("d-none")
        results += 1
      }
    }
  }
  // Cuento el result
  resultCount(results);
}

function removeFilterByTagOrCat(tag){
  // Saco un array con todos los posts (tienen postCol como clase). 
  var posts = document.getElementsByClassName("postCol");
  var results = 0;
  for(var i = 0; i < posts.length; i++){
    // Enseño todos los posts
    document.getElementById(posts[i].id).classList.remove("d-none")
    results += 1
  }
  // Cuento el result
  resultCount(results);
}

// Función para ver si los tags de los botones se han clickeado ya o no.
function hasBeenClicked(key, tagORcat){
  // Primero revisamos que no se haya clickeado un botón ya activo.
  var clicked = document.getElementById(tagORcat + "_" +key)
  var alltags = document.getElementsByClassName('tag-button-tagpage2')
  if(clicked.classList.contains('active')) {
    // Ya está activo! Así que ejecuto la función de enseñar todos.
    removeFilterByTagOrCat(key);
    // Por otro lado quito el active del botón.
    clicked.classList.remove('active')
  } else {
    // No está activo. Así que ejecuto la función de enseñar algunos.
    searchPostsByTagOrCat(key, tagORcat)
    // Por otro lado, le quito la clase a todos los botones, y se la pongo al clickeado.
    for (var i = alltags.length - 1; i >= 0; i--) {
      alltags[i].classList.remove('active')
    }
    clicked.classList.add('active')
  }
}


// Función para insertar los resultados. Hay código idéntico a este dentro de blog.html No me dejaba llamar a esta función por estar fuera.
function resultCount(results){
  if(results == 1 ){
    var singularORplular = " post"
  } else {
    var singularORplular = " posts"
  }
  document.getElementById("results-showing").innerHTML = "Showing: " + results + singularORplular;
}

// El botón del cambio de columnas (es el Show Filter y Hide Filter del blog.html).
function changeClasses(){
  // Cambio las columnas. Primero las cojo:
  var posts = document.getElementById('postsColumn');
  var filter = document.getElementById('filterColumn');
  //La de los posts: de pequeña a grande.
  posts.classList.toggle('col-md-12');
  posts.classList.toggle('col-md-9');
  // La de los filtros: de no estar a estar.
  filter.classList.toggle('d-md-block');

  // Cambio los botones
  var botones = document.getElementsByClassName("showHideFilterButton");
  for (var i = botones.length - 1; i >= 0; i--) {
    botones[i].classList.toggle('d-none')
  }
}

// Este es el código para cambiar la clase del navbar a colores (active)
$(".nav-title").click(function(e) {
  // Quito el active de donde sea
  $(".nav-title").removeClass("active");
  // Lo pongo a la que se ha dado click
  $(this).toggleClass("active");
});

// Este es el código para cambiar la clase del tagfilter a fondo de color (active). Idéntica a la anterior
$(".tag-button-tagpage").click(function(e) {
  // Quito el active de donde sea
  $(".tag-button-tagpage").removeClass("active");
  // Lo pongo a la que se ha dado click
  $(this).toggleClass("active");
});



// Esta es la search function, pero desde el Nav.
function searchPostsNavLocalhost(keyword){
  console.log(keyword)
  if (keyword.length > 0){
    // Lo único que hace es reenviar al blog, pero metiendo un url parameter de search. Y es distinto en función de si estamos en production u otra cosa.
    location.replace("http://localhost:4001/blog?search="+keyword)
  } else {
    // Hago Visible
    document.getElementById("searchInputDiv").classList.toggle('d-none');
    // Doy al Form el fondo blanco
    document.getElementById("searchForm").classList.toggle('backgroundWhite');
    // Pongo el cursor
    document.getElementById("searchInput").focus();
    document.getElementById("searchInput").select();
  }
}
function searchPostsNavProduction(keyword){
  if (keyword.length > 0){
    // Lo único que hace es reenviar al blog, pero metiendo un url parameter de search. Y es distinto en función de si estamos en production u otra cosa.
    location.replace("http://www.easysucculents.com/blog?search="+keyword)
  } else {
    // Hago Visible
    document.getElementById("searchInputDiv").classList.toggle('d-none');
    // Doy al Form el fondo blanco
    document.getElementById("searchForm").classList.toggle('backgroundWhite');
    // Pongo el cursor
    document.getElementById("searchInput").focus();
    document.getElementById("searchInput").select();
  }
}



// Esta es la función que se ejecuta siempre que se inicia el blog y que sirve para ver si hay un url parameter de búsqueda. Si lo hay, entonces lo introduce y si no lo hay lo deja en blanco.
function checkUrlParams(){
  console.log("checkUrlParams funciona")
  var keyword = getUrlVars()["search"]
  console.log(keyword)
}
// Función para sacar los parámetros de la URL. Lo saqué de aquí: https://html-online.com/articles/get-url-parameters-javascript/
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}



// Offsetting an html Anchor
// https://stackoverflow.com/questions/10732690/offsetting-an-html-anchor-to-adjust-for-fixed-header
// La solución de Ian Clark me llevó aquí, y eso es lo que copie:
// http://jsfiddle.net/ianclark001/rkocah23/
(function(document, history, location) {
  var HISTORY_SUPPORT = !!(history && history.pushState);

  var anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,
    OFFSET_HEIGHT_PX: 150,

    /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function() {
      this.scrollToCurrent();
      $(window).on('hashchange', $.proxy(this, 'scrollToCurrent'));
      $('body').on('click', 'a', $.proxy(this, 'delegateAnchors'));
    },

    /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function() {
      return this.OFFSET_HEIGHT_PX;
    },

    /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function(href, pushToHistory) {
      var match, anchorOffset;

      if(!this.ANCHOR_REGEX.test(href)) {
        return false;
      }

      match = document.getElementById(href.slice(1));

      if(match) {
        anchorOffset = $(match).offset().top - this.getFixedOffset();
        $('html, body').animate({ scrollTop: anchorOffset});

        // Add the state to history as-per normal anchor links
        if(HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }

      return !!match;
    },
    
    /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function(e) { 
      if(this.scrollIfAnchor(window.location.hash) && e) {
        e.preventDefault();
      }
    },

    /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function(e) {
      var elem = e.target;

      if(this.scrollIfAnchor(elem.getAttribute('href'), true)) {
        e.preventDefault();
      }
    }
  };

  $(document).ready($.proxy(anchorScrolls, 'init'));
})(window.document, window.history, window.location);



// LazyLoad: https://rcruz.es/blog/rendimiento/como-posponer-la-carga-de-imagenes-que-no-aparecen-en-pantalla/
// Este es el método que vamos a llamar
// cada vez que se detecte una intersección
function onScrollEvent(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var attributes = entry.target.attributes;
            var srcset = attributes['data-srcset'].textContent;
            entry.target.srcset = srcset;
            entry.target.classList.add('visible');
        }
    });
}
// Utilizamos como objetivos todos los
// elementos que tengan la clase lazyLoad,
// que vimos en el HTML de ejemplo.
var targets = document.querySelectorAll('.lazyLoad');
// Instanciamos un nuevo observador.
var observer = new IntersectionObserver(onScrollEvent);
// Y se lo aplicamos a cada una de las
// imágenes.
targets.forEach(function(entry) {
    observer.observe(entry);
});