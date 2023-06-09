// ANIMATION HEADER
$(document).ready(function(){
    var mouseX, mouseY, originX, originY, stockDiffX;
    var traX, mouseYtraY;

    originX = 0;
    originY = 0;
    // Get center circle coordonates
    const circleHeader = document.querySelector('#header-circle');
    const squareHeader = document.querySelector('#header-square');

    // Mouse animation
    $(document).mousemove(function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;

        if(originX > mouseX){
            var deplacement = (mouseX * 0.05) - 50
            originX = mouseX
            $(circleHeader).css('right', deplacement + 'px');
        }

        if(originX < mouseX){
            var deplacement = (mouseX * 0.05) - 50
            originX = mouseX
            $(circleHeader).css('right', deplacement + 'px');
        }

        if(originY < mouseY){
            var deplacement = (mouseY * 0.05) - 276
            originY = mouseY
            $(circleHeader).css('bottom', deplacement + 'px');
        }

        if(originY > mouseY){
            var deplacement = (mouseY * 0.05) - 276
            originY = mouseY
            $(circleHeader).css('bottom', deplacement + 'px');
        }
    })
});

// Key words banner
let parent = document.querySelectorAll('.scrolling-text');
for(let i = 0; i < parent.length; i++) {
  parent[i].style.width = parent[i].children[0].clientWidth + "px";
};


// NAVBAR
$(document).ready(function() {
    const nav = document.querySelector('#nav_container');
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var scrollBottom = $(window).scrollTop() + $(window).height() > $(document).height() - 20;
        var whoiAmPos = document.getElementById('whoiam').getBoundingClientRect();
        var skillsPos = document.getElementById('skills').getBoundingClientRect();
        var projectsPos = document.getElementById('projects').getBoundingClientRect();
        var contactPos = document.getElementById('contact').getBoundingClientRect();
        var triangleNav = document.querySelectorAll('#nav_triangle a svg');
        var squareNav = document.querySelectorAll('#nav_square a svg');
        var circleNav = document.querySelectorAll('#nav_circle a svg');
        var quartWin = $(window).height()/4;

        // RESPONSIVE VERTICAL
        // if($(window).width() > 1600){
        //     if (scroll > 0 && !scrollBottom ){
        //         nav.classList.remove("nav-container-mid")
        //         nav.classList.add("nav-container-top")
        //     }
        //
        //     if(scroll > 20){
        //         nav.classList.remove("nav-container-bot")
        //         nav.classList.remove("nav-container-top")
        //         nav.classList.add("nav-container-mid")
        //     }
        //
        //     if(scrollBottom){
        //         nav.classList.remove("nav-container-mid")
        //         nav.classList.add("nav-container-bot")
        //     }
        // }

        //OPACITY
        if(whoiAmPos.top > 0 ){
            turnOnOff(triangleNav[0], triangleNav[0])
        }

        if(whoiAmPos.top <= quartWin && skillsPos.top > quartWin){
            turnOnOff(triangleNav[0], squareNav[0])
        }

        if(skillsPos.top <= quartWin && projectsPos.top > quartWin){
            turnOnOff(squareNav[0], triangleNav[0]);
            turnOnOff(squareNav[0], circleNav[0]);
        }

        if(projectsPos.top <= quartWin && contactPos.top > quartWin){
            turnOnOff(circleNav[0], squareNav[0]);
        }

        if (scrollBottom){
            turnOnOff(circleNav[0], circleNav[0]);
        }
    })
});


function turnOnOff(turnOn, turnOff) {
    turnOn.classList.add('opa-100');
    turnOff.classList.remove('opa-100');
    turnOff.classList.add('opa-20');
}

// VIEWPORT project
var getElementsInArea = (function(docElm){
    var viewportHeight = docElm.clientHeight;

    return function(e, opts){
        var found = [], i;

        if( e && e.type == 'resize' )
            viewportHeight = docElm.clientHeight;

        for( i = opts.elements.length; i--; ){
            viewportHeight = docElm.clientHeight;
            var elm        = opts.elements[i],
                pos        = elm.getBoundingClientRect(),
                topPerc    = pos.top    / viewportHeight * 100,
                bottomPerc = pos.bottom / viewportHeight * 100,
                middle     = (topPerc + bottomPerc)/2,
                inViewport = middle > opts.zone[0] &&
                             middle < (100-opts.zone[1]);

            elm.classList.toggle(opts.markedClass, inViewport);

            var elmDetail   = elm.getElementsByClassName("project-detail")
            elmDetail[0].classList.toggle("opa-100", inViewport);

            if( inViewport )
                found.push(elm);
        }
    };
})(document.documentElement);

function f(e){
    getElementsInArea(e, {
        elements    : document.querySelectorAll('.project'),
        markedClass : 'highlight--1',
        zone        : [43, 43] // percentage distance from top & bottom
    });
}

window.addEventListener('scroll', f)
window.addEventListener('resize', f)


// PARALAX
function parallaxe(element, vitesse, direction)
{
    if( $(element).length > 0 )
    {
        var posY = $(element).css('top').split('px');
        var posY = parseFloat(posY[0]);

        var posX = $(element).css('left').split('px');
        var posX = parseFloat(posX[0]);

        $(window).scroll(function() {

            var scroll = $(window).scrollTop();
            var widthW = $(window).width();

            if(widthW > 993){
                switch( direction )
                {
                    case 'top':
                        var deplacement = posY - (scroll * vitesse);
                        $(element).css('top', deplacement + 'px');
                    break;

                    case 'bottom':
                        var deplacement = posY + (scroll * vitesse);
                        $(element).css('top', deplacement + 'px');
                    break;

                    case 'left':
                        var deplacement = posX - (scroll * vitesse);
                        $(element).css('left', deplacement + 'px');
                    break;

                    case 'right':
                        var deplacement = posX + (scroll * vitesse);
                        $(element).css('left', deplacement + 'px');
                    break;
                }
            }
        });
    }

}

function onresize() {
   return widthW = $(window).width();
}

parallaxe('#whoiam_bg', 0.4, 'top');
parallaxe('#whoiam_bg', 0.2, 'right');
parallaxe('#header_square', 0.8, 'top');

// SCROLL SQUARE SKILLS
function paralaxeScale(element, vitesse){
    var transform = $(element).css('width').split('px');
    var width = parseFloat(transform[0]);

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var varWidth = width + (scroll * vitesse);
        var widthW = onresize();

        console.log("widthW", widthW)
        if(varWidth >= widthW){
            $(element).css('height', varWidth + 'px');
            $(element).css('width, 100%');
        }
        else{
            $(element).css('height', varWidth + 'px');
            $(element).css('width', varWidth + 'px');
        }
    })
}
paralaxeScale('#skills_square', 0.4)
