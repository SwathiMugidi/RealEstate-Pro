import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import GreenValleyImage from "./Images/greenValley.jpg";
import SunsetGardensImage from "./Images/sunsetgardens.jpg";
const Projects = () => <h2>Projects Page</h2>;
const Documents = () => <h2>Documents Page</h2>;
const Users = () => <h2>Users Page</h2>;
const Reports = () => <h2>Reports Page</h2>;
const Profile = () => <h2>Profile Page</h2>;
const Settings = () => <h2>Settings Page</h2>;
// eslint-disable-next-line no-unused-vars
const ProjectDetails = () => <h2>Project Details Page</h2>;
const ProjectCard = ({ image, title, location, plots, price, onRemove }) => {
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate("/project-details");
  };
  const handleRemove = () => {
    onRemove(title);
  };
  return (
    <div className="project-card">
      <div className="project-status">Active</div>
      <img src={image} alt={title} />
      <div className="project-info">
        <h3>{title}</h3>
        <p>
          <i className="fas fa-map-marker-alt"></i> {location}
        </p>
        <p>
          <i className="fas fa-home"></i> {plots} plots available
        </p>
        <p>
          <i className="fas fa-dollar-sign"></i> Starting from {price}
        </p>
        <div className="project-buttons">
          <button onClick={handleViewDetails}>
            <i className="fas fa-expand"></i> View Details
          </button>
          <p className="remove-button" onClick={handleRemove}>
            <i className="fas fa-trash-alt"></i>
          </p>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ handleSidebarClick, activeItem, isSidebarVisible }) => (
  <aside className={`sidebar ${isSidebarVisible ? "visible" : ""}`}>
    <div className="sidebar-header">RealEstate Pro</div>
    <nav className="sidebar-nav">
      <ul>
        <li>
          <Link
            to="/dashboard"
            onClick={(e) => handleSidebarClick(e, "/")}
            className={activeItem === "/" ? "active" : ""}
          >
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            onClick={(e) => handleSidebarClick(e, "/projects")}
            className={activeItem === "/" ? "active" : ""}
          >
            <i className="fas fa-folder-open"></i> Projects
          </Link>
        </li>
        <li>
          <Link
            to="/documents"
            onClick={(e) => handleSidebarClick(e, "/documents")}
            className={activeItem === "/" ? "active" : ""}
          >
            <i className="fas fa-file-alt"></i> Documents
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            onClick={(e) => handleSidebarClick(e, "/users")}
            className={activeItem === "/" ? "active" : ""}
          >
            <i className="fas fa-users"></i> Users
          </Link>
        </li>
        <li>
          <Link
            to="/reports"
            onClick={(e) => handleSidebarClick(e, "/reports")}
            className={activeItem === "/" ? "active" : ""}
          >
            <i className="fas fa-chart-line"></i> Reports
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            onClick={(e) => handleSidebarClick(e, "/profile")}
            className={activeItem === "/" ? "active" : ""}
          >
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            onClick={(e) => handleSidebarClick(e, "/settings")}
            className={activeItem === "/" ? "active" : ""}
          >
            <i className="fas fa-cog"></i> Settings
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);
const App = () => {
  const [projects, setProjects] = useState([
    {
      image: GreenValleyImage,
      title: "Green Valley Heights",
      location: "Mumbai",
      plots: "30",
      price: "$250,000",
    },
    {
      image: SunsetGardensImage,
      title: "Sunset Gardens",
      location: "Delhi",
      plots: "25",
      price: "$250,000",
    },
  ]);
  const handleRemoveProject = (title) => {
    setProjects(projects.filter((project) => project.title !== title));
  };
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Added state to track the active item in the sidebar
  const [activeItem, setActiveItem] = useState("/");
  // Updated handleSidebarClick function to change the active item
  const handleSidebarClick = (event, path) => {
    event.preventDefault();
    setActiveItem(path); // Set the clicked item as active
    window.history.pushState({}, "", path); // Update URL without reloading
    window.location.reload(); // Refresh the page to navigate
  };
  return (
    <Router>
      <div className="app">
        <button className="hamburger" onClick={toggleSidebar}></button>
        <Sidebar
          handleSidebarClick={handleSidebarClick}
          activeItem={activeItem}
        />
        <main className="main-content">
          <header className="top-bar">
            <input type="text" placeholder="Search projects..." />
            <div className="top-bar-icons">
              <span className="icon">
                <i className="fas fa-bell"></i>
              </span>
              <span className="icon">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </header>
          <Routes>
            <Route path="/projects" element={<Projects />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/"
              element={
                <>
                  <section className="dashboard-overview-container">
                    <div className="dashboard-overview-header">
                      <h2>Dashboard Overview</h2>
                      <div className="dashboard-overview-button">
                        <button>+ Create User</button>
                        <button>+ Create Project</button>
                      </div>
                    </div>
                    <div className="dashboard-overview">
                      <div className="overview-card">
                        <div className="overview-content">
                          <span>Total Properties</span>
                          <p className="overview-number">2</p>
                          <span>+4.75% from last month</span>
                        </div>
                        <i className="fas fa-building"></i>
                      </div>
                      <div className="overview-card">
                        <div className="overview-content">
                          <span>Active Users</span>
                          <p className="overview-number">2,132</p>
                          <span>+2.02% from last month</span>
                        </div>
                        <i className="fas fa-users"></i>
                      </div>
                      <div className="overview-card">
                        <div className="overview-content">
                          <span>Documents</span>
                          <p className="overview-number">432</p>
                          <span>+28.14% from last month</span>
                        </div>
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <div className="overview-card">
                        <div className="overview-content">
                          <span>Revenue</span>
                          <p className="overview-number">$2.4M</p>
                          <span>+15.3% from last month</span>
                        </div>
                        <i className="fas fa-dollar-sign"></i>
                      </div>
                    </div>
                    <section className="recent-projects">
                      <h3>Recent Projects</h3>
                      <div className="projects-container">
                        {projects.map((project) => (
                          <ProjectCard
                            key={project.title}
                            image={project.image}
                            title={project.title}
                            location={project.location}
                            plots={project.plots}
                            price={project.price}
                            onRemove={handleRemoveProject}
                          />
                        ))}
                      </div>
                    </section>
                  </section>
                  <footer className="footer">
                    <p>© 2025 RealEstate Pro. All rights reserved.</p>
                    <div className="social-icons">
                      <span>
                        <a
                          href="https://www.facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-facebook"></i>
                        </a>
                      </span>
                      <span>
                        <a
                          href="https://www.twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      </span>
                    </div>
                  </footer>
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
