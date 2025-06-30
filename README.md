# User Directory & Crypto Tracker

A modern React application built with TypeScript and Redux Toolkit that combines a user directory with real-time cryptocurrency price tracking.

## ✨ Features

### 🧑‍🤝‍🧑 User Directory

- **User Management**: Fetches and displays user data from JSONPlaceholder API
- **Responsive Grid Layout**: Adaptive grid that scales from 1-4 columns based on screen size
- **User Cards**: Clean, modern cards displaying user information including:
  - Name and username
  - Email and phone
  - Company and location
  - Website information
- **Error Handling**: Comprehensive error states with retry functionality
- **Loading States**: Smooth loading animations and feedback

### 📈 Live Crypto Prices

- **Real-time Updates**: WebSocket connection to Binance API for live price data
- **Multiple Cryptocurrencies**: Tracks BTC, ETH, ADA, DOGE, and BNB prices
- **Price Movements**: Visual indicators for price changes with color coding
- **Connection Status**: Real-time connection status indicator with reconnection capability
- **Auto-reconnection**: Automatic reconnection with exponential backoff

### 🎨 UI/UX

- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- **Dark Mode Support**: Automatic dark/light mode based on system preferences
- **Modern Styling**: Gradient backgrounds, glass morphism effects, and smooth animations
- **Accessibility**: Proper semantic HTML and keyboard navigation support

## 🚀 Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 7
- **State Management**: Redux Toolkit + React Redux
- **Styling**: Custom CSS with responsive design
- **API Integration**: Fetch API + WebSocket
- **Code Quality**: ESLint with TypeScript rules
- **Development**: Hot Module Replacement (HMR)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── UserCard.tsx    # Individual user display component
│   └── CryptoPrices.tsx # Live crypto price component
├── hooks/              # Custom React hooks
│   ├── redux.ts        # Typed Redux hooks
│   └── useWebSocket.ts # WebSocket management hook
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup and types
│   └── userSlice.ts    # User state management
├── types/              # TypeScript type definitions
│   └── User.ts         # User interface types
├── App.tsx            # Main application component
├── App.css            # Application styles
├── main.tsx           # React application entry point
└── index.css          # Global styles
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-redux-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📜 Available Scripts

| Script            | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server with HMR  |
| `npm run build`   | Build production-ready application |
| `npm run lint`    | Run ESLint for code quality checks |
| `npm run preview` | Preview production build locally   |

## 🔧 Configuration

### Environment Setup

The application uses public APIs and doesn't require environment variables for basic functionality:

- **Users API**: JSONPlaceholder (https://jsonplaceholder.typicode.com/users)
- **Crypto API**: Binance WebSocket (wss://stream.binance.com:9443/ws/)

### Redux Store Configuration

The Redux store is configured with:

- **Redux Toolkit**: For simplified Redux logic
- **TypeScript Integration**: Fully typed actions and state
- **Async Thunks**: For API calls with proper error handling
- **Immutable Updates**: Using Immer under the hood

## 🎯 Usage Examples

### Adding New Crypto Symbols

To track additional cryptocurrencies, modify the `selectedSymbols` array in `CryptoPrices.tsx`:

```typescript
const [selectedSymbols] = useState([
  "BTCUSDT",
  "ETHUSDT",
  "ADAUSDT",
  "DOGEUSDT",
  "BNBUSDT",
  "SOLUSDT", // Add new symbols here
]);
```

### Customizing User Card Display

Modify `UserCard.tsx` to show additional user information:

```typescript
<div className="details">
  <p>
    <strong>Company:</strong> {user.company.name}
  </p>
  <p>
    <strong>City:</strong> {user.address.city}
  </p>
  <p>
    <strong>Phone:</strong> {user.phone}
  </p>
  <p>
    <strong>Website:</strong> {user.website}
  </p>
  {/* Add more fields as needed */}
</div>
```

### WebSocket Hook Usage

The custom `useWebSocket` hook can be reused for other WebSocket connections:

```typescript
const { connectionStatus, lastMessage, sendMessage, reconnect } = useWebSocket(
  "wss://your-websocket-url",
  {
    onOpen: () => console.log("Connected"),
    onClose: () => console.log("Disconnected"),
    shouldReconnect: true,
    maxReconnectAttempts: 5,
  }
);
```

## 🎨 Styling & Theming

The application uses custom CSS with:

- **CSS Grid & Flexbox**: For responsive layouts
- **CSS Custom Properties**: For consistent theming
- **Media Queries**: Mobile-first responsive design
- **CSS Animations**: Smooth transitions and hover effects
- **Dark Mode**: Automatic detection via `prefers-color-scheme`

### Responsive Breakpoints

```css
/* Mobile: 1 column */
@media (min-width: 768px) {
  /* Tablet: 2 columns */
}
@media (min-width: 1024px) {
  /* Desktop: 3 columns */
}
@media (min-width: 1400px) {
  /* Large desktop: 4 columns */
}
```

## 🔍 Key Features Deep Dive

### State Management with Redux Toolkit

- **Simplified Redux**: Uses RTK's `createSlice` for reducers
- **Async Actions**: `createAsyncThunk` for API calls
- **TypeScript Integration**: Fully typed state and actions
- **Immer Integration**: Immutable updates with mutable syntax

### WebSocket Integration

- **Custom Hook**: Reusable WebSocket logic
- **Auto-reconnection**: Handles connection drops gracefully
- **Error Handling**: Comprehensive error states
- **Type Safety**: Generic hook supports any message type

### Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Progressive Enhancement**: Enhanced experience on larger screens
- **Touch-friendly**: Appropriate touch targets and spacing
- **Performance**: Optimized CSS and minimal re-renders

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repository for automatic deployments
- **GitHub Pages**: Use the built files for static hosting
- **Firebase Hosting**: Deploy with Firebase CLI

### Build Optimizations

- **Code Splitting**: Automatic chunking for optimal loading
- **Tree Shaking**: Removes unused code
- **Minification**: Compressed JavaScript and CSS
- **Source Maps**: Available for debugging production issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration provided
- Write descriptive commit messages
- Add appropriate comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **JSONPlaceholder**: Free fake REST API for testing
- **Binance API**: Real-time cryptocurrency data
- **React Team**: For the amazing React framework
- **Redux Toolkit Team**: For simplifying Redux development