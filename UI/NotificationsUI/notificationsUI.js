const notificationCanvas = document.getElementById('notificationCanvas');
const notifCtx = notificationCanvas.getContext('2d');

const NOTIFICATION_LOGICAL_WIDTH = 1400; //same as resource 
const NOTIFICATION_LOGICAL_HEIGHT = 100;


let notificationStack = [];
const nextNotificationIcon=new Image();
nextNotificationIcon.src="Pics/rightArrow.png"

const prevNotificationIcon=new Image();
prevNotificationIcon.src="Pics/leftArrow.png"

const NOTIFICATIONS_PER_PAGE = 4; 
let currentNotificationPage = 0;   // Page index (0 = first page)

// Button definitions for notification navigation
const notifRightArrow = {
    x: 1350,          
    y: 20,            
    width: 50,
    height: 60,
    iconWidth: 25,
    iconHeight: 32,
    isClicked: false
};

const notifLeftArrow = {
    x: 0,            // Far left edge
    y: 20,
    width: 50,
    height: 60,
    iconWidth: 25,
    iconHeight: 32,
    isClicked: false
};

function setupNotificationCanvas() {
    // Use fixed dimensions like your resourceCanvas
    notificationCanvas.width = 1400;  // Width for notifications
    notificationCanvas.height = 100; // Enough for 4-5 notifications
    
    // Or make it match the viewport width
    // notificationCanvas.width = window.innerWidth;
    // notificationCanvas.height = window.innerHeight;
}

function createNotification(image, text, priority = "normal") {
    const exists = notificationStack.some(notification => notification.text === text);
    if (exists) return;
    
    const newNotification = new Notification(image, text, priority);
    notificationStack.push(newNotification);
    
    // Limit stack size (now pagination handles overflow, but keep a cap)
    if (notificationStack.length > 50) {
        notificationStack.shift();
    }
    
    // Jump to the last page when a new notification arrives (optional)
    const totalPages = Math.ceil(notificationStack.length / NOTIFICATIONS_PER_PAGE);
    currentNotificationPage = totalPages - 1;
    
    // Redraw
    drawNotifications(notifCtx);
}

function resizeNotificationCanvas() {
    const zoom = window.devicePixelRatio || 1;
    const cssWidth = NOTIFICATION_LOGICAL_WIDTH / zoom;
    const cssHeight = NOTIFICATION_LOGICAL_HEIGHT / zoom;
    notificationCanvas.style.width = `${cssWidth}px`;
    notificationCanvas.style.height = `${cssHeight}px`;
    // Keep drawing buffer at logical size
    notificationCanvas.width = NOTIFICATION_LOGICAL_WIDTH;
    notificationCanvas.height = NOTIFICATION_LOGICAL_HEIGHT;
}

function drawNotifications(ctx) {
    // Clear the canvas
    ctx.clearRect(0, 0, notificationCanvas.width, notificationCanvas.height);
    
    // Calculate page boundaries
    const startIndex = currentNotificationPage * NOTIFICATIONS_PER_PAGE;
    const endIndex = Math.min(startIndex + NOTIFICATIONS_PER_PAGE, notificationStack.length);
    const pageNotifications = notificationStack.slice(startIndex, endIndex);
    
    // Draw notifications for this page
    pageNotifications.forEach((notification, index) => {
        // Pass the actual index offset so x-positioning works correctly
        const actualIndex = startIndex + index;
        notification.draw(ctx, actualIndex);
    });
    
    // Draw navigation arrows (only if needed)
    drawNotificationArrows(ctx);
}

function drawNotificationArrows(ctx) {
    // Only show arrows if there are more notifications than fit on one page
    const totalPages = Math.ceil(notificationStack.length / NOTIFICATIONS_PER_PAGE);
    
    //if (totalPages > 1) {
        // Left arrow: show if we're not on the first page
       // if (currentNotificationPage > 0) {
            drawButton(ctx, notifLeftArrow, prevNotificationIcon);
        //}
        
        // Right arrow: show if we're not on the last page
       // if (currentNotificationPage < totalPages - 1) {
            drawButton(ctx, notifRightArrow, nextNotificationIcon);
       // }
   // }
}

// click handler move to controller if you would like 

function handleNotificationArrowClick(evt) {
    // Get mouse coordinates relative to notification canvas
    const rect = notificationCanvas.getBoundingClientRect();
    const scaleX = notificationCanvas.width / rect.width;
    const scaleY = notificationCanvas.height / rect.height;
    const mouseX = (evt.clientX - rect.left) * scaleX;
    const mouseY = (evt.clientY - rect.top) * scaleY;
    
    // Check left arrow
    if (mouseX >= notifLeftArrow.x && mouseX <= notifLeftArrow.x + notifLeftArrow.width &&
        mouseY >= notifLeftArrow.y && mouseY <= notifLeftArrow.y + notifLeftArrow.height) {
        
        notifLeftArrow.isClicked = true;
        setTimeout(() => { notifLeftArrow.isClicked = false; }, 150);
        
        if (currentNotificationPage > 0) {
            currentNotificationPage--;
        }
        drawNotifications(notifCtx);
        return;
    }
    
    // Check right arrow
    if (mouseX >= notifRightArrow.x && mouseX <= notifRightArrow.x + notifRightArrow.width &&
        mouseY >= notifRightArrow.y && mouseY <= notifRightArrow.y + notifRightArrow.height) {
        
        notifRightArrow.isClicked = true;
        setTimeout(() => { notifRightArrow.isClicked = false; }, 150);
        
        const totalPages = Math.ceil(notificationStack.length / NOTIFICATIONS_PER_PAGE);
        if (currentNotificationPage < totalPages - 1) {
            currentNotificationPage++;
        }
        drawNotifications(notifCtx);
        return;
    }
}

function handleCanvasClick(evt) {
    // ... existing UI button checks (upArrow, downArrow, etc.)
    
    // Check notification arrows (if click happened on notification canvas)
    const rect = notificationCanvas.getBoundingClientRect();
    if (evt.clientX >= rect.left && evt.clientX <= rect.right &&
        evt.clientY >= rect.top && evt.clientY <= rect.bottom) {
        handleNotificationArrowClick(evt);
        return; // Prevent other handlers from firing
    }
    
    // ... rest of your click logic (actor selection, etc.)
}

var shortestBeautifulSubstring = function(s, k) {
    let count = 0;
    let left = 0;
    let results=[];
    for (let right = 0; right < s.length; right++) {
        if (s[right] === '1') {
            count++;
        }

        while (count === k) {
            // Trim leading zeros to make the substring minimal for the current window
            while (s[left] === '0') {
                left++;
            }

            let sub = s.slice(left, right + 1);
            results.push(sub);

            // Move left past the current '1' to look for next potential substring
            count--;
            left++;
        }
    }
    if(results.length===0) return "";

    let result= results.reduce((shortest,curr)=>{
        if(curr.length<shortest.length) return curr;
        if(curr.length>shortest.length) return shortest;

        return curr < shortest ? curr : shortest;
     });
     return result;
};