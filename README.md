# Field Service Connect - Mobile App Prototype

A comprehensive mobile app prototype for field service technicians, built with HTML, CSS (Tailwind), and JavaScript.

## 🎯 Overview

Field Service Connect is a mobile-first web application designed for field technicians to manage their daily tasks, repair tickets, and work orders. This prototype demonstrates the complete user flow from login to task completion.

## 🚀 Live Demo

Visit the live demo: **[Your GitHub Pages URL]**

## 📱 Features

### Authentication
- **Login Screen** - Secure authentication with offline mode support
- **Forgot Password** - Password recovery flow

### Task Management
- **Task List** - View and manage scheduled tasks
- **Task Details** - Detailed task information with customer data
- **Map View** - Geographic view of task locations
- **Filter Modal** - Sort and filter tasks by various criteria

### Repair Workflow
- **Repair Tickets List** - All repair requests and their status
- **Ticket Details** - Comprehensive repair ticket information
- **Submit Request** - Create new repair requests

### Active Work Session
- **Start Task** - Pre-flight checklist and safety verification
- **Active Task** - Timer tracking with mandatory requirements
- **Paused Task** - Handle work interruptions
- **Log Time** - Manual time entry

### Task Completion
- **Completion Checklist** - Service task verification
- **Parts Used** - Inventory consumption tracking
- **Upload Images** - Photo evidence capture
- **Complete Task** - Final task summary
- **Customer Signature** - Digital sign-off

### Sync & Offline
- **Offline Banner** - Connection status indicator
- **Sync Status** - Data synchronization state
- **Pending Queue** - Queued actions for sync
- **Conflict Resolution** - Handle sync conflicts
- **Success/Failure Feedback** - Sync result notifications

### Settings
- **Configuration** - App settings and preferences

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling via CDN
- **Material Symbols** - Icon library
- **Vanilla JavaScript** - Navigation and interactions

## 📁 Project Structure

```
design/
├── index.html                    # Demo home page
├── shared/
│   └── nav.js                    # Shared navigation component
├── login_screen/
├── forgot_password_screen/
├── task_list_screen/
├── task_details_screen/
├── task_map_view_screen/
├── task_list_filter_modal/
├── repair_tickets_list_screen/
├── repair_ticket_details_screen/
├── submit_repair_request_screen/
├── start_repair_task_screen/
├── active_task_screen/
├── paused_task_screen/
├── log_additional_time_screen/
├── completion_checklist_screen/
├── enter_parts_used_screen/
├── upload_repair_images_screen/
├── complete_repair_task_screen/
├── customer_signature_screen/
├── add_comment_screen/
├── settings_&_configuration_screen/
├── global_offline_banner/
├── sync_status_icon/
├── pending_actions_queue_screen/
├── sync_conflict_resolution_screen/
├── sync_success_feedback/
└── sync_failure_feedback/
```

## 🎨 Design System

### Colors
- **Primary**: `#137fec` (Blue)
- **Background Light**: `#f6f7f8`
- **Background Dark**: `#101922`
- **Surface Dark**: `#1c242d`

### Typography
- **Font Family**: Inter
- **Font Weights**: 400, 500, 600, 700

### Components
- Cards with rounded corners
- Floating action buttons
- Bottom navigation
- Status badges and chips
- Form inputs with icons

## 🔗 Navigation Flow

```
Login → Task List → Task Details → Start Task → Active Task → Complete Task → Signature → Task List
                 ↘ Map View
                 ↘ Repair Tickets → Ticket Details → Start Repair
```

## 📦 Deployment

### GitHub Pages

1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Click Save

The site will be available at: `https://[username].github.io/[repository-name]/`

### Local Development

Simply open `index.html` in a web browser. No build step required!

## 🔧 Customization

### Changing the Primary Color
Update the `primary` color in the Tailwind config in each HTML file:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                "primary": "#your-color-here",
            },
        },
    },
}
```

### Adding New Screens
1. Create a new folder with your screen name
2. Add a `code.html` file inside
3. Include the shared navigation script: `<script src="../shared/nav.js"></script>`
4. Add a link from `index.html`

## 📄 License

This project is for demonstration purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

**Powered by Odoo** | v1.0.0
