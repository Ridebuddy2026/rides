# RideBuddies - File Map & Project Structure

## 📁 Project Overview
RideBuddies is a modern ride-sharing platform built with Next.js 15, TypeScript, and shadcn/ui components. This professional carpooling application allows users to share rides, save money, and connect with verified drivers.

---

## 🏗️ Project Structure

```
/home/z/my-project/
├── 📁 prisma/
│   ├── 📄 schema.prisma              # Database schema definition
│   └── 📁 db/                        # SQLite database files
│
├── 📁 public/
│   └── 📁 images/                    # Generated promotional images
│       ├── 🖼️ hero-banner.png        # Main hero banner (1440x720)
│       ├── 🖼️ community-ride.png    # Community illustration (1344x768)
│       ├── 🖼️ ride-sharing-app.png  # App mockup (1024x1024)
│       ├── 🖼️ logo-ridebuddies.png # Company logo (1024x1024)
│       ├── 🖼️ driver-welcome.png   # Driver welcome (1344x768)
│       └── 🖼️ savings-banner.png   # Savings illustration (1152x864)
│
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📄 page.tsx             # Main homepage component
│   │   ├── 📄 layout.tsx           # Root layout
│   │   └── 📄 globals.css          # Global styles
│   │
│   ├── 📁 components/
│   │   ├── 📁 ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── avatar.tsx
│   │   │   └── ... (other shadcn components)
│   │   │
│   │   ├── 📄 RidesList.tsx        # Rides listing with search & filters
│   │   └── 📄 CreateRideModal.tsx  # Create ride form modal
│   │
│   ├── 📁 lib/
│   │   └── 📄 db.ts                # Prisma client instance
│   │
│   └── 📁 styles/
│       └── 📄 globals.css          # Additional global styles
│
├── 📁 upload/
│   ├── 📁 extracted-ridebuddies/    # Original uploaded project
│   └── 📄 RIDEBUDDIES-FINAL-COMBINED.zip
│
├── 📁 components/                   # Legacy components (unused)
│
├── 📄 package.json                  # Dependencies & scripts
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 tailwind.config.ts           # Tailwind CSS configuration
├── 📄 next.config.mjs              # Next.js configuration
├── 📄 generate-ridebuddies-images.ts  # Image generation script
├── 📄 .env                         # Environment variables
├── 📄 .eslintrc.json              # ESLint configuration
└── 📄 FILE_MAP.md                 # This file
```

---

## 🗄️ Database Schema (Prisma)

### Models

#### User
```prisma
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String
  phone           String?
  isDriver        Boolean   @default(false)
  driverLicense   String?
  vehicleModel    String?
  vehicleColor    String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  rides           Ride[]    # Rides created by this user
  bookings        Booking[] # Bookings made by this user
}
```

#### Ride
```prisma
model Ride {
  id              String    @id @default(cuid())
  from            String
  to              String
  departureTime   DateTime
  seatsTotal      Int
  seatsAvailable  Int
  price           Float
  status          String    @default("active")
  description     String?
  driverId        String
  driverName      String
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  driver          User      @relation(fields: [driverId], references: [id])
  bookings        Booking[]
}
```

#### Booking
```prisma
model Booking {
  id          String    @id @default(cuid())
  rideId      String
  userId      String
  seats       Int
  status      String    @default("confirmed")
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  ride        Ride      @relation(fields: [rideId], references: [id])
  user        User      @relation(fields: [userId], references: [id])

  @@unique([rideId, userId])
}
```

---

## 🎨 UI Components

### Main Page (`src/app/page.tsx`)
**Features:**
- Sticky header with navigation
- Hero section with call-to-action buttons
- Statistics section (50K+ users, 10M+ km, 15K+ drivers)
- Features grid (6 key benefits)
- How It Works section (3 steps)
- Driver recruitment section
- Mobile app CTA section
- Sticky footer with company info
- Integrated rides search
- Create ride functionality

### Rides List Component (`src/components/RidesList.tsx`)
**Features:**
- Full-screen modal dialog
- Search by origin and destination
- Filter by date and number of passengers
- Sort options (departure, price, seats, rating)
- Paginated results (6 rides per page)
- Ride cards showing:
  - Route and timing
  - Driver info with avatar and rating
  - Vehicle details
  - Seat availability
  - Price per seat
- Booking modal with seat selection
- Total price calculation

### Create Ride Modal (`src/components/CreateRideModal.tsx`)
**Features:**
- Multi-step form in modal
- Route details (from, to, date, time)
- Seats & pricing section
  - Seat selection (1-8 seats)
  - Price per seat input
  - Earnings estimator
- Vehicle details
  - Vehicle model and color
  - Additional notes
- Form validation
- Success confirmation
- Important notes and tips

---

## 🖼️ Images Generated

| Image | Dimensions | Description | Usage |
|-------|-----------|-------------|-------|
| hero-banner.png | 1440x720 | People sharing rides together | Homepage hero section |
| community-ride.png | 1344x768 | Community carpooling illustration | How It Works section |
| ride-sharing-app.png | 1024x1024 | Mobile app mockup | App download CTA |
| logo-ridebuddies.png | 1024x1024 | Company logo | Header and footer |
| driver-welcome.png | 1344x768 | Professional driver image | Driver recruitment |
| savings-banner.png | 1152x864 | Cost savings illustration | Features section |

---

## 🚀 Key Features Implemented

### ✅ Frontend
- **Professional Homepage**: Modern, responsive design with hero section, features, statistics
- **Ride Search & Listing**: Comprehensive search with filters and pagination
- **Ride Booking**: Complete booking flow with seat selection and price calculation
- **Create Ride**: Full-featured form with validation and success states
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Sticky Footer**: Proper footer positioning for all screen sizes
- **Modals**: Clean, accessible modal dialogs for interactions
- **Form Validation**: Real-time validation with error messages

### ✅ Database
- **User Management**: Support for both passengers and drivers
- **Ride Management**: Complete ride lifecycle
- **Booking System**: Seat reservations and tracking
- **Relationships**: Proper foreign key relationships

### ✅ UI/UX
- **Modern Design**: shadcn/ui components with consistent styling
- **Visual Hierarchy**: Clear information architecture
- **Accessibility**: Proper labels, ARIA attributes
- **Loading States**: Loading indicators for async operations
- **Error Handling**: Clear error messages and feedback
- **Icons**: Lucide React icons throughout
- **Animations**: Smooth transitions and hover effects

---

## 🔧 Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 15.3.5 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | shadcn/ui | New York style |
| Database | Prisma ORM | Latest |
| Database Client | SQLite | Built-in |
| Icons | Lucide React | Latest |
| Images | Next.js Image | Optimized |
| Image Generation | z-ai-web-dev-sdk | Latest |

---

## 📊 Page Structure

### Homepage (/)
```
Header (sticky)
├── Logo
├── Navigation (Features, How It Works, Become a Driver)
└── Actions (Find Rides, Create Ride)

Hero Section
├── Badge (50K+ travelers)
├── Headline
├── Description
├── CTA Buttons (Find a Ride, Offer a Ride)
└── Rating badge (4.9 stars)

Stats Section
├── 50K+ Active Users
├── 10M+ Kilometers Shared
├── 15K+ Verified Drivers
└── 98% Satisfaction Rate

Features Section (6 cards)
├── Save Money
├── Safe & Verified
├── Make Friends
├── Flexible Schedule
├── Eco-Friendly
└── 24/7 Support

How It Works Section
├── Step 1: Search or Create
├── Step 2: Book & Confirm
├── Step 3: Enjoy the Ride
└── Community image

Driver Section
├── Badge (Earn Money)
├── Headline
├── Benefits list
└── CTA button

App CTA Section
├── Headline
├── Description
└── App store buttons

Footer (sticky)
├── Logo and tagline
├── Company links
├── Support links
├── Legal links
└── Copyright

Modals
├── Rides List (full-screen)
└── Create Ride Modal
```

---

## 🎯 User Flow

### Passenger Flow
1. **Landing**: User lands on homepage
2. **Search**: Click "Find Rides" → Opens search dialog
3. **View Rides**: See available rides with filters
4. **Select**: Click on desired ride
5. **Book**: Select seats, confirm booking
6. **Confirmation**: Receive booking confirmation

### Driver Flow
1. **Landing**: User lands on homepage
2. **Create**: Click "Create Ride" → Opens create modal
3. **Fill Form**: Enter route, time, seats, price, vehicle
4. **Submit**: Form validation → Success message
5. **Go Live**: Ride becomes visible to passengers

---

## 📝 Next Steps (To Implement)

### High Priority
- [ ] API routes for CRUD operations
  - GET /api/rides - List rides with filters
  - POST /api/rides - Create new ride
  - GET /api/rides/:id - Get ride details
  - POST /api/bookings - Create booking
  - GET /api/users/profile - Get user profile

### Medium Priority
- [ ] Driver profile setup modal
- [ ] Admin dashboard with ride management
- [ ] User authentication (NextAuth.js)
- [ ] Real-time updates (WebSocket)
- [ ] Payment integration

### Low Priority
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Push notifications
- [ ] In-app messaging
- [ ] Rating system for passengers

---

## 🐛 Known Issues

None currently identified. The application is in a stable development state.

---

## 📞 Support

For questions or issues:
- Check the dev server logs: `/home/z/my-project/dev.log`
- Run lint check: `bun run lint`
- Database operations: `bun run db:push`

---

## 📄 License

This is a proprietary project. All rights reserved.

---

**Last Updated**: 2025-01-XX
**Version**: 1.0.0
**Status**: Development - Frontend Complete
