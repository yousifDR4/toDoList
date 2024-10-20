export function saveTaskList(taskList) {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function getTaskList() {
  const taskList = localStorage.getItem("taskList");
  return taskList ? JSON.parse(taskList) : [];
}

export function clearTaskList() {
  localStorage.removeItem("taskList");
}
