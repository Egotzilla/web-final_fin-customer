# Next.js MongoDB Product & Customer Management System

A comprehensive web application built with **Next.js 14**, **MongoDB**, and **Mongoose** that demonstrates modern full-stack development practices.

## 🚀 Features

### Core Functionality
- **Complete CRUD Operations** for both Products and Customers
- **RESTful API Design** following industry best practices
- **MongoDB Integration** with Mongoose ODM
- **Real-time Data Management** with optimistic updates
- **Responsive UI** built with Material-UI and Tailwind CSS

### Technical Highlights
1. **MongoDB CRUD operations** using Mongoose
2. **Client Components** interacting with APIs
3. **Server Components** interacting with Server Actions
4. **API Route Handlers** with Next.js 14 App Router
5. **Form Validation** with React Hook Form
6. **Data Grid** with Material-UI DataGrid
7. **Modern JavaScript** with ES6+ features

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── customer/
│   │       ├── route.js           # Customer CRUD API
│   │       └── [id]/route.js      # Individual customer operations
│   ├── customer/
│   │   ├── page.js                # Customer management page
│   │   └── [id]/page.js           # Customer detail page
│   ├── layout.js                  # Root layout
│   ├── page.js                    # Home page
│   └── globals.css                # Global styles
├── models/
│   └── Customer.js                # Mongoose Customer schema
├── lib/
│   └── db.js                      # Database connection utility
├── actions/
│   ├── customers.js               # Customer server actions
│   └── articles.js                # Article server actions
├── public/                        # Static assets
└── API_DESIGN.md                  # API documentation
```

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React 18, Material-UI, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS, Material-UI, Emotion
- **Development**: ESLint, PostCSS

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or cloud)
- npm or pnpm package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-mongo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

### Customer API
- `GET /api/customer` - Get all customers
- `POST /api/customer` - Create new customer
- `GET /api/customer/[id]` - Get customer by ID
- `PUT /api/customer/[id]` - Update customer (full replacement)
- `PATCH /api/customer/[id]` - Update customer (partial)
- `DELETE /api/customer/[id]` - Delete customer

### Product API (Designed)
See `API_DESIGN.md` for complete Product API documentation including:
- Full CRUD operations
- Query parameters for filtering and pagination
- Request/response examples
- Testing commands

## 🗄️ Data Models

### Customer Schema
```javascript
{
  name: String (required),
  dateOfBirth: Date (required),
  memberNumber: Number (required, unique),
  interests: String (required),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Product Schema (Designed)
```javascript
{
  code: String (required, unique),
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required),
  inStock: Boolean (default: true),
  stockQuantity: Number (default: 0),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🧪 Testing

### Manual API Testing
```bash
# Test Customer API
curl -X GET http://localhost:3000/api/customer
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"John Doe","dateOfBirth":"1990-01-01","memberNumber":12345,"interests":"Technology"}' \
  http://localhost:3000/api/customer

# Test with query parameters
curl "http://localhost:3000/api/customer?limit=10&sort=name"
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Configure build settings for Next.js
- **Railway**: Add MongoDB addon and deploy
- **Heroku**: Use buildpack for Next.js applications

## 📚 Learning Resources

This project demonstrates:
- **Next.js 14 App Router** - Modern routing and layouts
- **Server Components** - React Server Components patterns
- **API Routes** - RESTful API design with Next.js
- **MongoDB Integration** - Database operations with Mongoose
- **Form Handling** - Modern form patterns with React Hook Form
- **UI Components** - Material-UI integration with Next.js
- **State Management** - Client-side state with React hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Material-UI Documentation](https://mui.com/)
- [API Design Guide](./API_DESIGN.md)
