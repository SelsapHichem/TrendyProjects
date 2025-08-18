# Current Trend Project Specs Generator

A comprehensive web application that analyzes real-time trends for specific domains and audiences, then generates tailored project specifications based on identified user needs and country-specific considerations.

## 🚀 Features

### Core Functionality
- **Real-time Trend Analysis**: Analyze current trends across 15+ domains with popularity scoring, growth rates, and geographic relevance
- **Audience Targeting**: Understand demographics, preferences, and behavioral patterns to align projects with target audiences
- **Project Specification Generation**: Generate detailed project specs with technical requirements, timelines, success metrics and market opportunities
- **Database Schema Design**: Complete database schema with proper relationships, indexes, and data persistence strategy
- **AI-Powered Insights**: Leverage artificial intelligence to identify patterns, predict opportunities, and generate actionable recommendations
- **Global Market Context**: Country-specific considerations including regulations, cultural factors, and economic indicators

### Supported Domains
- Technology
- Fashion
- Health & Wellness
- Finance
- Education
- Entertainment
- Food & Beverage
- Travel
- Automotive
- Real Estate
- E-commerce
- Gaming
- Sustainability
- AI & Machine Learning
- Blockchain

### Target Countries
- United States, United Kingdom, Germany, France, Japan
- China, India, Brazil, Australia, Canada
- South Korea, Netherlands, Singapore, Sweden, Switzerland

## 🏗️ Database Schema

### Central Entities
1. **Trends** - Core trend data with popularity scores and geographic relevance
2. **Audiences** - Target audience demographics and characteristics
3. **Projects** - Generated project specifications
4. **Country_Contexts** - Country-specific market and regulatory information
5. **Analysis_Sessions** - Session data and generated outputs

### Key Relationships
- Projects ↔ Audiences (Many-to-One)
- Projects ↔ Country_Contexts (Many-to-One)
- Projects ↔ Trends (Many-to-Many via project_trends)
- Trends ↔ Trend_Sources (One-to-Many)

## 🎯 Project Output Format

Each generated project includes:
- **Project Title** - Clear, market-focused name
- **Target Audience Description** - Demographics and characteristics
- **Trend Alignment** - Which specific trends it addresses
- **Country-Specific Considerations** - Local regulations and cultural factors
- **Technical Requirements** - Technology stack and infrastructure needs
- **Estimated Timeline** - Development phases and milestones
- **Success Metrics** - KPIs and performance indicators
- **Market Opportunity Assessment** - Size, growth, and competitive landscape

## 🔧 Technical Stack

- **Frontend**: React with Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint

## 📊 Application Workflow

1. **Setup & Analysis**: Configure domain, country, audience parameters
2. **Trend Results**: Review identified trends with popularity scores and growth data
3. **Project Generation**: Generate tailored project specifications based on trends
4. **Database Schema**: Review and download complete database design

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dashboard

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run linting
pnpm run lint
```

## 📱 Usage

1. **Start Analysis**: Select your target domain and country from the dropdown menus
2. **Configure Audience**: Set age range, income level, and interests
3. **Choose Complexity**: Select project complexity (simple/medium/complex)
4. **Analyze Trends**: Click "Analyze Current Trends" to process data
5. **Review Results**: Examine trend popularity scores and growth rates
6. **Generate Projects**: Create detailed project specifications
7. **Database Design**: Review and download SQL schema

## 🎨 Features in Detail

### Trend Analysis
- Popularity scoring (0-100)
- Growth rate tracking with visual indicators
- Geographic relevance mapping
- Source reliability scoring
- Last 30 days focus for real-time insights

### Project Generation
- Market opportunity sizing
- Technical requirement specification
- Timeline estimation based on complexity
- Success metrics definition
- Country-specific regulatory considerations

### Database Schema
- Complete SQL schema generation
- Proper indexing strategy
- Foreign key relationships
- Data type optimization
- Downloadable SQL file

## 🌍 Country-Specific Features

### United States
- GDPR-like privacy law considerations
- SEC regulations for finance projects
- FDA requirements for health apps

### United Kingdom
- GDPR compliance mandatory
- Brexit considerations
- NHS integration opportunities

### Germany
- Strict data protection laws
- Industry 4.0 initiatives
- BaFin financial regulations

## 📈 Analytics & Metrics

The application tracks:
- Trend popularity scores
- Growth rate percentages
- Market opportunity sizing
- Project timeline estimates
- Success metric definitions
- User engagement patterns

## 🔒 Data Constraints

- Focus on trends from last 30 days
- Project feasibility within 1-3 months
- Local regulation compliance
- Measurable business potential prioritization

## 🛠️ Development

### Project Structure
```
src/
├── components/
│   ├── TrendAnalyzer.jsx       # Main form for trend analysis setup
│   ├── TrendResults.jsx        # Display trend analysis results
│   ├── ProjectGenerator.jsx    # Generate project specifications
│   ├── DatabaseSchema.jsx      # Database design and SQL generation
│   ├── Dashboard.jsx           # Main application flow
│   ├── Header.jsx              # Application header
│   └── Sidebar.jsx             # Navigation sidebar
├── data/
│   └── mockData.js             # Sample data for development
├── App.jsx                     # Root application component
└── main.jsx                    # Application entry point
```

### Key Components

- **TrendAnalyzer**: Handles user input and trend analysis configuration
- **TrendResults**: Visualizes trend data with charts and metrics
- **ProjectGenerator**: Creates detailed project specifications
- **DatabaseSchema**: Manages database design and SQL generation

## 📝 License

This project is part of the MetaGPTX platform for software development services.

## 🤝 Contributing

This application was generated as part of the MGX (MetaGPTX) platform's automated development capabilities, showcasing comprehensive trend analysis and project specification generation.