/**
 * Field Service Connect - Shared Navigation & Mobile Frame Component
 * Provides consistent navigation and mobile-first display across all screens
 */

// ============================================
// MOBILE-FIRST RESPONSIVE STYLES
// ============================================
function initMobileFrame() {
    // Check if this screen opts out of mobile-first styling
    if (document.body.classList.contains('no-mobile-frame')) {
        return;
    }
    
    // Add mobile-container class to body for CSS targeting
    document.body.classList.add('mobile-responsive');
    
    // Wrap all body content in a mobile container div
    wrapBodyContent();
    
    // Inject mobile-first responsive styles
    const mobileStyles = document.createElement('style');
    mobileStyles.id = 'mobile-frame-styles';
    mobileStyles.textContent = `
        /* Mobile-First Base Styles */
        html, body.mobile-responsive {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            min-height: 100dvh;
        }
        
        /* Desktop/Tablet - Center content at mobile width */
        @media (min-width: 481px) {
            body.mobile-responsive {
                display: flex !important;
                flex-direction: row !important;
                justify-content: center !important;
                align-items: flex-start;
                background: #1a1a2e;
            }
            
            #mobile-content-wrapper {
                max-width: 430px;
                width: 100%;
                box-shadow: 0 0 40px rgba(0,0,0,0.3);
                min-height: 100vh;
                min-height: 100dvh;
                display: flex;
                flex-direction: column;
                position: relative;
            }
        }
        
        /* Mobile - Full width */
        @media (max-width: 480px) {
            #mobile-content-wrapper {
                max-width: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                min-height: 100dvh;
                position: relative;
            }
        }
        
        /* Ensure smooth scrolling on touch devices */
        * {
            -webkit-overflow-scrolling: touch;
        }
    `;
    
    // Insert at the beginning of head
    document.head.insertBefore(mobileStyles, document.head.firstChild);
}

// Wrap all body content in a mobile container
function wrapBodyContent() {
    // Skip if already wrapped
    if (document.getElementById('mobile-content-wrapper')) {
        return;
    }
    
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.id = 'mobile-content-wrapper';
    
    // Move all body children into the wrapper
    while (document.body.firstChild) {
        wrapper.appendChild(document.body.firstChild);
    }
    
    // Add wrapper to body
    document.body.appendChild(wrapper);
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
            /* On desktop, position nav relative to centered wrapper */
            @media (min-width: 481px) {
                #floating-nav {
                    left: calc(50% - 215px + 16px); /* 215px = half of 430px max-width */
                }
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
    // Append to the mobile wrapper if it exists, otherwise body
    const wrapper = document.getElementById('mobile-content-wrapper');
    if (wrapper) {
        wrapper.appendChild(navContainer);
    } else {
        document.body.appendChild(navContainer);
    }
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
