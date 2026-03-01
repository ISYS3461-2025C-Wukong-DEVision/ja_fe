# DEVision - Job Applicant Subsystem (Frontend)

## 📌 Project Overview
[cite_start]**DEVision** is a career-tech platform designed to connect IT applicants with potential employers[cite: 10, 11]. [cite_start]This repository contains the **Job Applicant Subsystem**, which provides tools for career advancement, including secure registration, job searching, and profile management[cite: 13, 14].

[cite_start]**My Role:** I was responsible for the entire Frontend development, ensuring the system met professional standards for usability and technical architecture[cite: 22, 29, 31].

## 🏗️ Technical Architecture
Instead of a standard monolithic UI, I implemented a **Layered Frontend Architecture** to ensure high maintainability and clear separation of concerns:

1.  **API Layer:** Defines RESTful endpoints and Axios configurations for communication with the Job Manager and Backend services.
2.  **Service Layer:** Handles data fetching and transformation logic, ensuring the UI receives only necessary data.
3.  **Logic Layer (Custom Hooks):** Encapsulates business logic and state management, keeping the presentation layer "clean."
4.  **UI Layer (React Components):** Responsive components built with a focus on reusability and user experience.

> **Design Choice:** This `Service -> Hook -> UI` pattern was chosen to prioritize modularity, a principle I am currently scaling in my latest **React Native** projects.

## 🛠️ Tech Stack
* [cite_start]**Core:** React.js (Vite)[cite: 57].
* **Styling:** Tailwind CSS (Responsive Design for Desktop & Mobile).
* **Authentication:** Secure JWT handling (JWS/JWE).
* **State Management:** React Hooks & Context API.
* **API Client:** Axios for REST HTTP requests.

## ✨ Key Features Implemented
* **Authentication:** Email-based registration with password strength validation and account activation.
* **Profile Management:** Comprehensive profile builder including Education, Work Experience, and Technical Skill tagging.
* **Smart Job Search:** Full-text search (FTS) with filtering by location, salary range, and employment type.
* **Premium Subscription:** Monthly subscription interface integrated with third-party payment gateways.
* **Real-time Readiness:** Integrated frontend logic to handle Kafka-driven real-time notifications for job matches.

## 📷 Gallery
*The following screenshots demonstrate the UI/UX developed for the Job Applicant subsystem:*

### 1. Landing Page & Overview
The entry point for applicants, designed for clarity and ease of navigation.
<img width="1920" height="1080" alt="devisionja-home" src="https://github.com/user-attachments/assets/df439d19-8b2a-45aa-b25e-5b98bfae547b" />

### 2. Comprehensive Profile & History Management
A feature-rich dashboard where users can manage their Education (degrees), Work Experience, and Technical Skills. It fully supports file uploads for Avatars, CVs, and Cover Letters. Additionally, users can track their platform activity through dedicated views for Job Applied History and Transaction History.
<img width="1920" height="1080" alt="devisionja-profile" src="https://github.com/user-attachments/assets/51208057-c6d7-4ff2-9eaf-5287516eba2a" />

### 3. Job Search & Application Interface
Advanced search with multi-criteria filtering and a seamless application workflow.
<img width="1920" height="1080" alt="devisionja-searchjob-applyjob" src="https://github.com/user-attachments/assets/a90d080e-5176-4ac2-b57b-04c3fd4c060e" />

### 4. Premium Subscription & Payment Gateway
Secure subscription portal integrated with third-party payment providers for exclusive features.
<img width="1920" height="1080" alt="devisionja-subscription-premium-pay" src="https://github.com/user-attachments/assets/49dfcd18-0070-4dbf-b801-431740716397" />


---

*Note: This project was part of a collaborative squad at RMIT. Due to the complexity of the Microservices backend, this repository focuses on the Frontend implementation and API orchestration.*
