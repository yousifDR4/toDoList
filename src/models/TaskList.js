import { getTaskList } from "../utlis/TaskListStorage";
export const taskList = getTaskList();

export const taskListTestData = [
  {
    name: "Api Integration",
    description: "Integrate the API with the frontend",
    status: "pending",
  },
  {
    name: "front end",
    description: "create front end code ",
    status: "completed",
  },
  {
    name: "Database Setup",
    description: "Setup the initial database schema",
    status: "pending",
  },
  {
    name: "Authentication",
    description: "Implement user authentication",
    status: "completed",
  },
  {
    name: "Authorization",
    description: "Implement user authorization",
    status: "pending",
  },
  {
    name: "Unit Testing",
    description: "Write unit tests for the API",
    status: "completed",
  },
  {
    name: "Integration Testing",
    description: "Write integration tests for the API",
    status: "pending",
  },
  {
    name: "Deployment",
    description: "Deploy the application to the server",
    status: "pending",
  },
  {
    name: "Code Review",
    description: "Review the code for best practices",
    status: "completed",
  },
  {
    name: "Bug Fixing",
    description: "Fix bugs reported by QA",
    status: "pending",
  },
  {
    name: "UI Design",
    description: "Design the user interface",
    status: "completed",
  },
  {
    name: "Performance Optimization",
    description: "Optimize the application performance",
    status: "pending",
  },
  {
    name: "Documentation",
    description: "Write documentation for the API",
    status: "completed",
  },
  {
    name: "Feature Development",
    description: "Develop new features",
    status: "pending",
  },
  {
    name: "Code Refactoring",
    description: "Refactor the existing codebase",
    status: "completed",
  },
  {
    name: "Security Audit",
    description: "Perform a security audit",
    status: "pending",
  },
  {
    name: "User Feedback",
    description: "Collect and analyze user feedback",
    status: "completed",
  },
  {
    name: "Version Control",
    description: "Manage version control with Git",
    status: "completed",
  },
  {
    name: "Continuous Integration",
    description: "Setup continuous integration",
    status: "pending",
  },
  {
    name: "Continuous Deployment",
    description: "Setup continuous deployment",
    status: "pending",
  },
];
// saveTaskList(taskList);
