# Ryde - Ride Sharing Application

**Ryde** is a modern ride-sharing platform built using **Next.js** that allows users to search for rides, view available options, and book rides. The application leverages the power of **Google Maps** for location selection and distance calculations, making it easier for users to find the most relevant rides quickly.

## Features

- **Search for Rides**: Users can enter their source and destination to find available rides.
- **View Ride Details**: See ride information, including car type, date, time, and price.
- **Book Rides**: Select a ride and proceed to a booking page for payment.
- **Responsive Design**: Mobile and desktop-friendly interface.
- **Context Management**: Source and destination management using React Context API.

## Getting Started

To get started with the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/navteshthakur/Ryde-ride-sharing-web-application.git
cd ryde
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```env
NEXT_PUBLIC_GOOGLE_API_KEY=your-google-maps-api-key
```

Replace `your-google-maps-api-key` with your actual [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

Here's an overview of the project's folder structure:

- **app/**: Contains all main application pages and components.
- **components/**: Reusable UI components like `InputItem`, `SearchSection`, `CarListItem`, and `RideListOptions`.
- **context/**: React Context API providers for managing global states like `SourceContext` and `DestinationContext`.
- **utils/**: Utility functions, including `CarListData` for car options and `geometry.js` for distance computation.
- **models/**: Mongoose models for database schema, if applicable.
- **public/**: Contains static assets such as images and fonts.
- **styles/**: Custom styles for the application.

## Technologies Used

- **Next.js 13**: Framework for building server-side rendered and statically generated React applications.
- **React**: JavaScript library for building user interfaces.
- **MongoDB** (optional): Database for storing ride and user data.
- **Google Maps API**: For location-based features and distance calculation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Context API**: For state management across the application.

## How to Use

### 1. Searching for Rides

- Enter your source and destination in the `SearchSection` component.
- Click the "Search" button to calculate the distance between the locations and find available rides.

### 2. Viewing and Selecting Rides

- Browse through the list of available rides in the `RideListOptions` component.
- Click on a ride to see its details, including car type, date, and price.

### 3. Booking and Payment

- Once you choose a ride, you can proceed to the booking page to make a payment.
- The app provides a button for booking with the calculated cost, which redirects to a payment page.

## Development and Contribution

### Prerequisites

- **Node.js** (14.x or higher)
- **npm**, **yarn**, **pnpm**, or **bun** as a package manager
- A Google Maps Platform account with an API key for map and distance features

### Run the App Locally

To start the development server:

```bash
npm run dev
```

### Building for Production

To build the app for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run start
```

### Deploying Your App

You can deploy your Next.js app on **Vercel**, the platform from the creators of Next.js. Simply:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Connect your repository to [Vercel](https://vercel.com) and deploy.

**Note**: Ensure your environment variables are set up in Vercel as they are in your local `.env.local` file.

## Features to Add

- **User Authentication**: Implement user sign-in/sign-up functionality for personalized experiences.
- **User Profiles**: Allow users to view and manage their ride history and payment information.
- **Advanced Filters**: Filter rides based on car type, price, or date.
- **Rating and Reviews**: Add a feature for users to rate and review rides.

## Learn More

To dive deeper into Next.js, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive guide on Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorials for mastering Next.js.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Contribute to or explore the source code.

## Acknowledgments

- **Google Maps Platform**: For providing powerful location services.
- **Next.js and React**: For building a robust and scalable application.
- **Tailwind CSS**: For creating a clean and responsive design.


