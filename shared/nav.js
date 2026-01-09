/**
 * Field Service Connect - Shared Navigation & Mobile Frame Component
 * Provides consistent navigation and mobile-first display across all screens
 */

// ============================================
// MOBILE-FIRST RESPONSIVE WRAPPER
// ============================================
function initMobileFrame() {
    // Check if this screen opts out of mobile-first styling
    if (document.body.classList.contains('no-mobile-frame')) {
        return;
    }
    
    // Inject mobile-first responsive styles
    const mobileStyles = document.createElement('style');
    mobileStyles.id = 'mobile-frame-styles';
    mobileStyles.textContent = `
        /* Mobile-First Base Styles */
        html, body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            min-height: 100dvh;
        }
        
        body {
            min-height: 100vh !important;
            min-height: 100dvh !important;
            display: flex !important;
            justify-content: center !important;
            align-items: flex-start !important;
        }
        
        /* Desktop/Tablet - Constrain to mobile width for demo */
        @media (min-width: 481px) {
            body > *:first-child:not(#mobile-frame-styles):not(#floating-nav):not(script):not(style):not(link) {
                max-width: 430px !important;
                width: 100% !important;
                min-height: 100vh !important;
                min-height: 100dvh !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                position: relative !important;
                margin: 0 auto !important;
            }
        }
        
        /* Mobile - Full width, natural scroll */
        @media (max-width: 480px) {
            body > *:first-child:not(#mobile-frame-styles):not(#floating-nav):not(script):not(style):not(link) {
                max-width: 100% !important;
                width: 100% !important;
                min-height: 100vh !important;
                min-height: 100dvh !important;
                overflow: visible !important;
            }
        }
        
        /* Ensure smooth scrolling on touch devices */
        .overflow-y-auto, .overflow-auto, [class*="overflow-y-auto"], [class*="overflow-auto"] {
            -webkit-overflow-scrolling: touch;
        }
        
        /* Custom scrollbar */
        @media (min-width: 481px) {
            body > *:first-child:not(#mobile-frame-styles):not(#floating-nav):not(script):not(style):not(link)::-webkit-scrollbar {
                width: 4px;
            }
            body > *:first-child:not(#mobile-frame-styles):not(#floating-nav):not(script):not(style):not(link)::-webkit-scrollbar-track {
                background: transparent;
            }
            body > *:first-child:not(#mobile-frame-styles):not(#floating-nav):not(script):not(style):not(link)::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.2);
                border-radius: 4px;
            }
        }
    `;
    
    // Insert at the beginning of head
    document.head.insertBefore(mobileStyles, document.head.firstChild);
    
    // Wrap body content if needed for proper structure
    wrapBodyContent();
}

function wrapBodyContent() {
    // Get all direct children of body that are actual content
    const body = document.body;
    const children = Array.from(body.children);
    
    // Check if there's already a wrapper div
    const hasWrapper = children.some(child => {
        return child.tagName === 'DIV' && 
               (child.classList.contains('relative') || 
                child.classList.contains('flex') ||
                child.id === 'app-container');
    });
    
    // If no clear wrapper exists and body has multiple children, wrap them
    if (!hasWrapper && children.length > 1) {
        const wrapper = document.createElement('div');
        wrapper.id = 'app-container';
        wrapper.className = 'relative flex flex-col min-h-screen w-full bg-background-light dark:bg-background-dark';
        
        children.forEach(child => {
            if (child.tagName !== 'SCRIPT' && 
                child.tagName !== 'STYLE' && 
                child.id !== 'mobile-frame-styles' &&
                child.id !== 'floating-nav') {
                wrapper.appendChild(child);
            }
        });
        
        body.insertBefore(wrapper, body.firstChild);
    }
}

// Navigation configuration
const NAV_CONFIG = {
    screens: {
        // Authentication
        'login': { path: '../login_screen/code.html', icon: 'login', label: 'Login' },
        'forgot_password': { path: '../forgot_password_screen/code.html', icon: 'lock_reset', label: 'Forgot Password' },
        
        // Task Management
        'task_list': { path: '../task_list_screen/code.html', icon: 'list', label: 'Tasks' },
        'task_details': { path: '../task_details_screen/code.html', icon: 'info', label: 'Task Details' },
        'task_map': { path: '../task_map_view_screen/code.html', icon: 'map', label: 'Map View' },
        
        // Repair Flow
        'repair_list': { path: '../repair_tickets_list_screen/code.html', icon: 'handyman', label: 'Repairs' },
        'repair_details': { path: '../repair_ticket_details_screen/code.html', icon: 'description', label: 'Ticket Details' },
        'submit_repair': { path: '../submit_repair_request_screen/code.html', icon: 'add_circle', label: 'New Request' },
        
        // Active Work
        'start_task': { path: '../start_repair_task_screen/code.html', icon: 'play_arrow', label: 'Start' },
        'active_task': { path: '../active_task_screen/code.html', icon: 'schedule', label: 'Active' },
        'paused_task': { path: '../paused_task_screen/code.html', icon: 'pause', label: 'Paused' },
        
        // Completion
        'complete_task': { path: '../complete_repair_task_screen/code.html', icon: 'task_alt', label: 'Complete' },
        'checklist': { path: '../completion_checklist_screen/code.html', icon: 'checklist', label: 'Checklist' },
        'parts_used': { path: '../enter_parts_used_screen/code.html', icon: 'inventory_2', label: 'Parts' },
        'upload_images': { path: '../upload_repair_images_screen/code.html', icon: 'photo_camera', label: 'Photos' },
        'signature': { path: '../customer_signature_screen/code.html', icon: 'draw', label: 'Signature' },
        
        // Settings
        'settings': { path: '../settings_&_configuration_screen/code.html', icon: 'settings', label: 'Settings' },
        
        // Index
        'home': { path: '../index.html', icon: 'home', label: 'Demo Home' }
    },
    
    // Screen flow relationships
    flows: {
        'login': { next: 'task_list', prev: null },
        'task_list': { next: 'task_details', prev: 'login', alt: ['task_map', 'repair_list'] },
        'task_details': { next: 'start_task', prev: 'task_list' },
        'start_task': { next: 'active_task', prev: 'task_details' },
        'active_task': { next: 'complete_task', prev: 'start_task', alt: ['paused_task'] },
        'paused_task': { next: 'active_task', prev: 'active_task' },
        'complete_task': { next: 'signature', prev: 'active_task' },
        'signature': { next: 'task_list', prev: 'complete_task' },
        'repair_list': { next: 'repair_details', prev: 'task_list' },
        'repair_details': { next: 'start_task', prev: 'repair_list' }
    }
};

// Create floating navigation button
function createFloatingNav() {
    const navContainer = document.createElement('div');
    navContainer.id = 'floating-nav';
    navContainer.innerHTML = `
        <style>
            #floating-nav {
                position: fixed;
                bottom: 100px;
                left: 16px;
                z-index: 9999;
                font-family: 'Inter', sans-serif;
            }
            #floating-nav .nav-btn {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: linear-gradient(135deg, #137fec 0%, #0f65bd 100%);
                border: none;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 20px rgba(19, 127, 236, 0.4);
                transition: all 0.3s ease;
            }
            #floating-nav .nav-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(19, 127, 236, 0.5);
            }
            #floating-nav .nav-menu {
                position: absolute;
                bottom: 60px;
                left: 0;
                background: #1c242d;
                border-radius: 16px;
                border: 1px solid #2d3748;
                padding: 8px;
                min-width: 200px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                transition: all 0.3s ease;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            }
            #floating-nav .nav-menu.open {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            #floating-nav .nav-menu a {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                color: #e2e8f0;
                text-decoration: none;
                border-radius: 10px;
                transition: all 0.2s ease;
                font-size: 14px;
                font-weight: 500;
            }
            #floating-nav .nav-menu a:hover {
                background: rgba(19, 127, 236, 0.15);
                color: #137fec;
            }
            #floating-nav .nav-menu a .material-symbols-outlined {
                font-size: 20px;
            }
            #floating-nav .nav-menu .nav-divider {
                height: 1px;
                background: #2d3748;
                margin: 8px 0;
            }
            #floating-nav .nav-menu .nav-header {
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: #64748b;
                padding: 8px 12px 4px;
            }
        </style>
        <button class="nav-btn" onclick="toggleNavMenu()">
            <span class="material-symbols-outlined">menu</span>
        </button>
        <div class="nav-menu" id="nav-menu">
            <div class="nav-header">Quick Navigation</div>
            <a href="../index.html">
                <span class="material-symbols-outlined">home</span>
                Demo Home
            </a>
            <div class="nav-divider"></div>
            <div class="nav-header">Main Screens</div>
            <a href="../login_screen/code.html">
                <span class="material-symbols-outlined">login</span>
                Login
            </a>
            <a href="../task_list_screen/code.html">
                <span class="material-symbols-outlined">list</span>
                Task List
            </a>
            <a href="../repair_tickets_list_screen/code.html">
                <span class="material-symbols-outlined">handyman</span>
                Repairs
            </a>
            <a href="../settings_&_configuration_screen/code.html">
                <span class="material-symbols-outlined">settings</span>
                Settings
            </a>
        </div>
    `;
    document.body.appendChild(navContainer);
}

// Toggle menu visibility
function toggleNavMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('open');
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.getElementById('floating-nav');
    const menu = document.getElementById('nav-menu');
    if (nav && menu && !nav.contains(e.target)) {
        menu.classList.remove('open');
    }
});

// Initialize on DOM ready
function initAll() {
    initMobileFrame();
    createFloatingNav();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
