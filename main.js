var currentPage = 'pageHomeContent';
var inHyperSpace = false;

// This gets run on document load, think of it as an init site function
// In jQuery, the $(document).ready(function(){}); call runs when the
// DOM (Document Object Model) is ready
$(document).ready(function()
{
    // setup menu buttons
    setupMenuButtons();
    
    // setup config window
    setupConfigWindow();
    
    // setup config options
    setupConfigOptions();
    
    // start spritely
    $('#starMap').pan({fps: 30, speed: 0.5, dir: 'left'});
    
    // replace titles
    Cufon.replace('h2', {
    	fontFamily: 'DejaVu',
		color: '-linear-gradient(#fe8432, #ce5402)'
	});

    // start hovering spaceship
    hover('spaceship', 0, 20, 1000);
    
    // open home
    $('#pageHomeContent').fadeIn();
    
    // load up alien interactions
    setupAlien();
    startAlienInvasion();
});

// Makes an object hover between it's minimim and maximum hight
function hover(objId, minHeight, maxHeight, durationIn)
{
    if($('#' + objId).data('direction') == 'up')
    {
        var newBgPosition = '0px ' + minHeight + 'px';
        $('#' + objId).data('direction', 'down');
    }
    else
    {
        var newBgPosition = '0px ' + maxHeight + 'px';
        $('#' + objId).data('direction', 'up');
    }
    
    $('#' + objId).animate({backgroundPosition: newBgPosition}, durationIn, function()
    {
        hover(objId, minHeight, maxHeight, durationIn);
    });
}

// Makes the config buttons do what they do
function setupConfigOptions()
{
    $('#configWindow div.option div.toggle').abToggleState();
    $('#configWindow div.option div.toggle').css({backgroundPosition: "0 -25px"});

    $('#configWindow div.option div.toggle').click(function()
    {
        $(this).abToggleState();
        if($(this).abIsToggledOn())
        {
            $(this).stop().animate({backgroundPosition:"0px -25px"}, {duration:300});
        }
        else
        {
            $(this).stop().animate({backgroundPosition:"0px 0px"}, {duration:300});
        }
        
        configToggleFunctionDispatcher(this, $(this).abIsToggledOn());
    });
}

// Simply sets up the animations for the confif window
function setupConfigWindow()
{
    $('#configBtn').click(function()
    {
        $('#header').animate({
            top: "-120px"
        }, 1000, function()
        {
            $('#configWindow').animate({
                top: "0px"
            }, 1000);
        });
    });
    
    $('#closeConfigBtn').click(function()
    {
        $('#configWindow').animate({
            top: "-220px"
        }, 1000, function()
        {
            $('#header').animate({
                top: "0px"
            }, 1000);
        });
    });
}

// Makes the menu buttons zoom around the page
function setupMenuButtons()
{
    // menu links link to a page anchor by default, clear out if we have javascript support
    $('#mainMenu > ul > li > a').attr('href', '#');
    // now set up the cooler links for our menu buttons
	$('#mainMenu > ul > li > a').click(function()
    {
        // translates btnPageName to pagePageName
        var pageId = 'page' + this.id.substr(3);
        // translates btnPageName to pagePageNameContent
        var contentId = 'page' + this.id.substr(3) + 'Content';
        
        if(contentId != currentPage && !inHyperSpace)
        {
            inHyperSpace = true;
            $('#' + currentPage).fadeOut('400', function()
            {
                $('#container').scrollTo($('#' + pageId), 2000, {onAfter:function()
                {
                    $('#' + contentId).fadeIn();
                    currentPage = contentId;
                    inHyperSpace = false;
                }});
            });
        }
        
	});
}

// Sets up how the alien interacts with the mouse
function setupAlien()
{
	$('#alien').mouseover(function()
	{
		$(this).animate({
            left: "-128px"
        }, 100, function()
        {
        	var alienNumber = Math.floor(Math.random()*6);
			var alienTimer  = 15 + Math.floor(Math.random()*60);
	
			$('#alien').css('background', "transparent url('images/alien_" + alienNumber + ".png') top left no-repeat");
        	window.setTimeout("startAlienInvasion()", alienTimer * 1000);
        });
	});
}

// Displays our alien
function startAlienInvasion()
{
	$('#alien').animate({
		left: "-10px"
	}, 600);
}

// This function is basically deciding what to do when a config button is toggled
function configToggleFunctionDispatcher(obj, isToggledOn)
{
	switch(obj.id)
	{
		case 'starToggle':
			$('#starMap').spToggle();
			break;
        case 'spaceshipToggle':
            if(isToggledOn)
            {
                hover('spaceship', 0, 20, 1000);
            }
            else
            {
                $('#spaceship').stop();
            }
            break;
	}
}

// A custom jQuery method, actually tied to the jQuery functions, so it can be called from
// an object like $(selector).abToggleState();
(function($)
{ 
    $.fn.abToggleState = function()
    {
        return this.each(function()
        {
            if($(this).data('state') == 'on')
            {
                $(this).data('state', 'off');
            }
            else
            {
                $(this).data('state', 'on');
            }
        });
    }

    $.fn.abIsToggledOn = function()
    {
        if($(this).data('state') == 'on')
        {
            return true;
        }
        else
        {
            return false;
        }
    }
})(jQuery); 