/* 20130531_0935 Inserted: SubMenuVisible = 1; (2 occasions) */



/* This code has been tested on:
 *
 * Computer                   OS                             Browser
 *
 * iPad3                      iOS6 (Version unknown)         Safari (Version unknown)
 * Samsung Galaxy Note 10.1   Android 4.1.2                  Dolphin Browser 9.4.1
 * Samsung Galaxy Note 10.1   Android 4.1.2                  Maxthon 4.0.4.1000
 * Samsung Galaxy Note 10.1   Android 4.1.2                  Opera 14.0.1074.57768 (I couldn't get Opera Mini 7.5.3 to work work with my local addresses)
 * Samsung Galaxy Note 10.1   Android 4.1.2                  Default Browser "Internet" (Version unknown)
 * Sony Vaio VPCF23Q1E/B      Windows 7 Professional 64 Bit  Opera 12.14 Version 12.14
 *                            Service Pack 1 Build 7601
 * Sony Vaio VPCF23Q1E/B      Windows 7 Professional 64 Bit  Firefox Version 20.0.1
 *                            Service Pack 1 Build 7601
 * Sony Vaio VPCF23Q1E/B      Windows 7 Professional 64 Bit  Safari Version 5.1.7
 *                            Service Pack 1 Build 7601
 * Sony Vaio VPCF23Q1E/B      Windows 7 Professional 64 Bit  Google Chrome Version 26.0.1410.64 m
 *                            Service Pack 1 Build 7601
 * Sony Vaio VPCF23Q1E/B      Windows 7 Professional 64 Bit  Microsoft Explorer Version 9.0.8112.16421 64-bit Edition
 *                            Service Pack 1 Build 7601
 * Sony Vaio VPCF23Q1E/B      Windows 7 Professional 64 Bit  Maxthon Cloud Browser (RC) Version 4.0.3.3000
 *                            Service Pack 1 Build 7601
 */


jQuery(document).ready(function($) {
  
  /* START - Variables declaration */
  /* Here, these variables must be either empty strings ot set to 0. */
  
  var FirstClick = 0;               /* If there has been a first click on a parent menu item this
                                    * variable gets the value 1.
                                    */
                                    
  var ClickedItem = '';             /* The target of the click (element the user clicked or tapped on).
                                    */
                                    
  var ClickedItemParent = '';       /* Parent element of the target of the click as seen by jQuery.
                                    */
                                    
  var MainMenuItem = '';            /* This variable contains the item information if an item in the Main
                                     * Menu has been clicked or tapped on.
                                     */
                                     
  var MainMenuItemOLD = '';         /* This variable contains the item information the last item in the Main
                                     * Menu that has been clicked or tapped on. This information is stored
                                     * then and only then when no other click elsewhere occurred between the
                                     * first and the second click on an item in the Main Menu.
                                     */
                                     
  var SubMenuVisible = 0;           /* This variable contains 1 if a submenu is visible and 0 if it is
                                     * hidden. Introducing this variable together with the function
                                     * "hideAfterDelay" makes the task of hiding submenus on iPads easier.
                                     * If SubmenuVisible = 1
                                     *             the parent element acquires the class "submenu-visible".
                                     * If SubmenuVisible = 0
                                     *             the parent element loses the class "submenu-visible".
                                     */
                                     
  var iPadPhonePod = 0;             /* This variable contains 1 if a iPad, an iPhone or an iPad has been
                                     * detected.
                                     */
                                      
  var CurrentClock = 0;             /* Variable which contains the number of the current clock associated
                                     * with the setTimeout function.
                                     * Only one clock is allowed to be active at a time. All others get
                                     * cleared.
                                     */
                                     
  /* These value of the following variables can be altered. */                                   
  var iDeviceDelay = 4000; // Milliseconds                                   
                                    /* For this time the submenus are vissible, if an iDevice (iPad, iPod,
                                     * iPhone) has been detected. (Variable iPadPhonePod = 1.)
                                     * This is only relevant if the method how submenus shall be hidden is
                                     * set to ControlViaTime (Variable ControlViaTime = 1.)
                                     * This delay was chosen for on "i-Devices" users have almost no chance
                                     * to hide a submenu by clicking "elsewhere". The only region known to
                                     * me is the area to the left of the main menu in the class "menu_wrapper".
                                     * This should give ample time to choose an menu item but be short enough
                                     * as not to annoy the users.
                                     */
                                     
  var DefaultDelay = 8000; // Milliseconds                                   
                                    /* For this time the submenus are vissible, if no iDevice (iPad, iPod,
                                     * iPhone) has been detected. (Variable iPadPhonePod = 0.)
                                     * This is only relevant if the method how submenus shall be hidden is
                                     * set to ControlViaTime (Variable ControlViaTime = 1.)
                                     * This delay was chosen for "non-i-Devices" users have a great choice of
                                     * "elsewheres" to click on and subsequently hiding a submenu.
                                     */
                                     
  var CloseItemInsert = '<li class="leaf close-item"><a href="#">submenu</a></li>';                                   
                                    /* The variable CloseItemInsert contains the HTML code which is inserted
                                     * below the parent menu items. This insertion has to be constructed in
                                     * way to ensure that
                                     * 1) it builds the first submenu item
                                     * 2) this so built item has the classes "leaf" and  "close-item"
                                     * 3) the content is short and explains what happens when the item is
                                     *    clicked. Recommendation: "submenu".
                                     * This variable is only relevant when the option "ControlViaCloseItem"
                                     * is chosen.
                                     */ 
                                  
/* Of the following variables the first variable called "ControlViaTime" can be set independent of the others.
Either ControlViaCloseItem or ControlViaPlaceholder has to be set to 0, for this determines how the second
click on a parent menu item is processed.*/                              
                                     
  var ControlViaTime = 0;           /* The method how submenus shall be hidden is by time delay. Submenus are
                                     * shown for a certain duration, see variables iDeviceDelay, DefaultDelay.
                                     */                                    
  
  var ControlViaCloseItem = 1;      /* Here as the first child item in a submenu, a text 
                                     * "submenu <arrow head up>" (<arrow head up>: \25B2).
                                     * Clicking on this item closes the submenu.
                                     */                                    
  
  var ControlViaPlaceholder = 0;    /* A click on the parent menu item leads to no content. The parent menu item
                                     * functions merely as a button to slide out or slide in its children items.
                                     * This behavior is similiar to the parent menu items in the Drupal theme
                                     * tweme (Twitter Bootstrap).
                                     */
                                                             
  /* END - Variables declaration */
  
  
  /* START - Setting default control mechanism for hiding submenus */                                  
  if ((ControlViaPlaceholder != 1) && (ControlViaCloseItem != 1) && (ControlViaTime != 1)) {
     ControlViaTime = 0;
     ControlViaCloseItem = 1;
     ControlViaPlaceholder = 0; 
  }
  
  if ((ControlViaPlaceholder == 1) && (ControlViaCloseItem == 1)) {
     ControlViaCloseItem = 1;
     ControlViaPlaceholder = 0;
  }
  /* END - Setting default control mechanism for hiding submenus */
  
    
  /* START - Detecting iPad, iPhone, iPod */
  /* Caution: This is not 100% sure, but what else is? */
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
       iPadPhonePod = 1; 
  }
  /* END - Detecting iPad, iPhone, iPod */
  
  
  if (ControlViaTime == 1) {
     var hideAfterDelay = function(MainMenuItemSubShown) {                     
                     
                     if (iPadPhonePod == 1) {
                        DelayTime = iDeviceDelay;                   
                     }    
                     else {
                        DelayTime = DefaultDelay;
                        /* This delay was chosen for "non-i-Devices" users have a great
                         * choice of "elsewheres" to click on and subsequently hiding a
                         * submenu.
                         */
                     }
                     
                     clearTimeout(CurrentClock);
                      
                     CurrentClock = setTimeout(function() {
                       $(MainMenuItemSubShown).parent().children('ul').hide();
                       $(MainMenuItemSubShown).parent().removeClass('submenu-visible');
                       
                       SubMenuVisible = 0; /* Submenu gets invisible after the time
                                            * given in variable "DelayTime" is over.
                                            * When this has happend, the variable
                                            * "SubMenuVisible" gets the value 0.
                                            */                   
                     }, DelayTime);                         
     };
   }   
  
  
  /* START - Open - close submenu when "NAVIGATION" bar is visible */   
  /* Relevant for small screen - viewport - behavior */
  
  $('.nav-toggle').click(function() {
     $('#main-menu div ul:first-child').slideToggle(250);
     return false;
  });
  /* END - Open - close submenu when "NAVIGATION" bar is visible */
  
  
  /* --------------------------------------------------------------------------------------------------- */  
  /* START - Wide screen - viewport behavior */
 
  if (($(window).width() > 640) || ($(document).width() > 640)) {
  
     if (ControlViaCloseItem == 1) {
        /* START - Insert top submenu item */
        $('#main-menu li.expanded ul').each( function( index ) {
           $(this).children().eq(0).before(CloseItemInsert);
        });
        /* END - Insert top submenu item */
     }
    
    
     /* START - Catch all (left) clicks */
     $('html').click(function(event) {
      
        ClickedItem = event.target;
        ClickedItemParent = $(event.target).parent();
              
       
       /* START - Catch all (left) clicks on menu items */
       if (ClickedItemParent.parents('#main-menu').last().attr('role') == 'navigation') {
        
          if (ControlViaCloseItem == 1) {
             if ($(ClickedItem).closest('li').hasClass('close-item')) {
                FirstClick = 0;
                $(ClickedItem).closest('ul').hide();
                $(ClickedItem).parents().removeClass('submenu-visible');
                  
                SubMenuVisible = 0;
                if (ControlViaTime == 1) {
                   /* START - Clear current clock in function "hideAfterDelay" */
                   clearTimeout(CurrentClock);
                   /* END - Clear current clock in function "hideAfterDelay" */
                }
                event.stopPropagation()
                event.preventDefault();
                return false;
             }
          } 
        
          /* START - Catch all (left) clicks on parent menu items */
          if (ClickedItemParent.hasClass('expanded')) {        
            
             MainMenuItem = ClickedItem;      
           
             if (FirstClick == 0){
              
                SubMenuVisible = 1; // Submenu is visible as per definitionem.    
               
                FirstClick = 1;
                
                $(MainMenuItem).parent().addClass('submenu-visible');
                           
                $(MainMenuItem).parent().children('ul').show();
                
                MainMenuItemOLD = MainMenuItem; 
                              
                if (ControlViaTime == 1) {
                   /* START - Set delay and hide submenue after Delay in "hideAfterDelay" */
                   hideAfterDelay(MainMenuItem);       
                   /* END - - Set delay and hide submenue after Delay in "hideAfterDelay" */
                }
                event.target = '';
                event.stopPropagation()
                event.preventDefault();
                return false;
             }      
             else {
                /* Here "else" means FirstClick == 1.
                 * If FirstClick == 1 can't be written directly because the preceeding if-statement 
                 * ("FirstClick == 0", see above) contains the line "FirstClick = 1;".
                 */                       
                if ((MainMenuItemOLD.title != MainMenuItem.title) && (MainMenuItemOLD.title != '')) {
                   
                   /* This "if" means that the first click of the user hit on either an element
                    * outside the main menu or on a different item on the main menu as with his
                    * second click.
                    */ 
                    
                    SubMenuVisible = 1; // SubMenuVisible = 1 is already set. This is just to be clear.
                    
                   $(MainMenuItemOLD).parent().children('ul').hide();
                   $(MainMenuItem).parent().children('ul').show();
                   
                   $(MainMenuItemOLD).parent().removeClass('submenu-visible');
                   $(MainMenuItem).parent().addClass('submenu-visible');
                   
                   if (ControlViaTime == 1) {
                      /* START - Set delay and hide submenue after Delay in "hideAfterDelay" */
                      hideAfterDelay(MainMenuItem);      
                      /* END - - Set delay and hide submenue after Delay in "hideAfterDelay" */
                   }
                   event.target = '';                   
                   MainMenuItemOLD = MainMenuItem;
                   event.stopPropagation()
                   event.preventDefault();
                   return false;               
                }
                else {
                   /* This "else" means that the first and the second click of the user hit on the
                    * same item of the main menu. There was no other click inbetween.
                    */     
                   
                   if (SubMenuVisible == 1) {
                      /* The default operation following this click is going to happen, when the submenu
                       * is visible. This behavior ensures that the user has chosen an item while seeing
                       * all options.
                       */        
                      FirstClick = 0;
                      
                      $(MainMenuItem).parent().children('ul').hide();
                      $(MainMenuItem).parent().removeClass('submenu-visible');
                      
                      if (ControlViaTime == 1) {
                         /* START - Clear current clock in function "hideAfterDelay" */
                         clearTimeout(CurrentClock);
                         /* END - Clear current clock in function "hideAfterDelay" */
                      }
                      SubMenuVisible = 0;
                      
                      if (ControlViaPlaceholder == 1) {
                        
                         /* START - Ensure that the click stops here */                     
                         event.stopPropagation();
                         event.preventDefault();
                         event.target = '';
                         return false;
                         /* END - Ensure that the click stops here */
                      }
                      
                      /* Normal execution of the click */
                      event.target = '';
                      return;
                   }
                   
                   if (SubMenuVisible == 0) {
                      /* As the users can't see all options, they might want to see again all the options.
                       * Therefore the click on the parent menu item just makes the submenu items appear
                       * again.
                       */                                
                      FirstClick = 1;
                      SubMenuVisible = 1;
                      
                      $(MainMenuItem).parent().children('ul').show();
                      $(MainMenuItem).parent().addClass('submenu-visible');
                      
                      if (ControlViaTime == 1) {
                          /* START - Set delay and hide submenue after Delay in "hideAfterDelay" */
                          hideAfterDelay(MainMenuItem);      
                          /* END - - Set delay and hide submenue after Delay in "hideAfterDelay" */
                       }
                      event.stopPropagation()
                      event.preventDefault();
                      return false; 
                   }
                } 
             }        
          }
          /* END - Catch all (left) clicks on parent menu items */
       }
       /* END - Catch all (left) clicks on menu items */
       
       
       /* START - Catch all (left) clicks "elsewhere" */
       else {
        
          MainMenuItemOLD = '';
          
          FirstClick = 0;
          SubMenuVisible = 0;                   
                  
          if (MainMenuItem.title != '') {
            
             $(MainMenuItem).parent().children('ul').hide();
             $(MainMenuItem).parent().removeClass('submenu-visible');
             
             if (ControlViaTime == 1) {
                /* START - Clear current clock in function "hideAfterDelay" */
                clearTimeout(CurrentClock);
                /* END - Clear current clock in function "hideAfterDelay" */
             }
          } 
       }
       /* END - Catch all (left) clicks "elsewhere" */  
      
       event.target = '';
     });
     /* END - Catch all (left) clicks */
  }
  /* END - Wide screen - viewport behavior */

/* --------------------------------------------------------------------------------------------------- */ 
 
  else {
    
  /* Start - Small screen - viewport behavior */
    
     $('#main-menu li').each(function() {
          
       if($(this).children('ul').length) {
               
         $(this).append('<span class="drop-down-toggle"><span class="drop-down-arrow"></span></span>');
       }        
     });
     $('.drop-down-toggle').click(function() {
      
       $(this).parent().children('ul').slideToggle(250);
     });
  }
  /* END - Small screen - viewport behavior */ 
});

