# 🎓 Baze University DEMO Payment Portal

A modern, responsive web application for Baze University's payment portal system, designed to provide seamless access for both new and returning students.

## ✨ Features

- **Dynamic User Interface**: Adapts form fields based on user type selection
- **Responsive Design**: Optimized for all device sizes
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Real-time Instructions**: Context-aware guidance based on user selection
- **Form Validation**: Comprehensive input validation and error handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd baze-university-payment-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4000`

## 🏗️ Project Structure

```
baze-university-payment-portal/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles and animations
│   └── script.js           # JavaScript functionality
├── server.js               # Express server
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## 🎯 User Flow

### 1. Initial Screen
- Portal title and university logo
- User type selection dropdown
- Default instruction message

### 2. New Student Flow
- Select "New Student" from dropdown
- Form displays:
  - Application ID field
  - Email Address field
- Instructions update to show new student guidance

### 3. Returning Student Flow
- Select "Returning Student" from dropdown
- Form displays:
  - Student ID field
  - Email Address field
- Instructions update to show returning student guidance

### 4. Form Submission
- Validation of all required fields
- Success message and redirect preparation

## 🎨 Design Features

- **Color Scheme**: Professional greens and grays with white backgrounds
- **Typography**: Inter font family for modern readability
- **Shadows**: Subtle depth with box shadows
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## 🔧 Technical Details

- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Backend**: Node.js with Express
- **Port**: 4000 (configurable via environment variables)
- **API Endpoints**: `/api/user-type` for dynamic instructions

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🚀 Production Deployment

1. **Build for production**
   ```bash
   npm start
   ```

2. **Environment variables**
   ```bash
   PORT=4000
   NODE_ENV=production
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

## NOTE

This is for Educational purposes only 



---

**Built with ❤️ for Baze University**
