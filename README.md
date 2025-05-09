# Performance Analyzer

**Performance Analyzer** is a modern tool designed to measure, track, and evaluate the performance of web applications over time. It leverages Google's PageSpeed Insights API to deliver detailed metrics and actionable recommendations for optimization.

## Analytics

This project uses the **Google PageSpeed Insights API** to analyze and retrieve performance metrics such as:

- First Contentful Paint
- Largest Contentful Paint
- Total Blocking Time
- Speed Index
- Cumulative Layout Shift

These metrics are fetched for both **mobile** and **desktop** strategies, processed, and displayed in an easy-to-read format with visual feedback and historical tracking.

## Tech Stack

The application is built with the following technologies:

- **TypeScript** – Ensures type safety and robust code structure
- **JavaScript** – Enhances interactivity and dynamic features
- **HTML & CSS** – Interface structure and styling
- **Vite** – Lightning-fast frontend tooling
- **Express.js** – Backend server for handling API calls and report logic

## Usage

1. Launch the application in your browser.
2. Enter the URL of the website you want to analyze.
3. View performance results, optimization, recommendations and historory.
4. Save the report to the history for future tracking.
5. Set up trackers to automatically re-test performance daily and save the report. ( Check example.com to see a tracked website)


##  Feature Roadmap

### Completed
- Report Dashboard
- PageSpeed API Integration
- Save Report Feature
- History Dashboard
- URL Tracker
- Performance Recommendations

### Planned
- AI-Powered Optimization Recommendations
- User Authentication (Login/Register)
- User-Based Tracked Sites and Report History

## DevOps & Deployment

### Backend
- **CI/CD** is handled using **GitHub Actions**.
- Upon pushing to the main branch, the backend is deployed automatically to an **AWS EC2 instance**.

### Frontend
- The frontend (Vite-based) is deployed on **Vercel**.
- Each push to the main branch triggers an automatic deployment via Vercel’s GitHub integration.

## License

This project is licensed under the [MIT License](LICENSE).

## Known Issues

1.When a pageSpeed query fails the page has to be reload to try again. Context is not allowing to query again (Fix Date: may 15)

## Contact

Maintained by [Samuel Espinosa](https://github.com/samuelespinosa).  
For feedback or collaboration, feel free to open an issue or pull request.
