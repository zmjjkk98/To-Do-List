document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const todoList = document.getElementById("todo-list");
  const todoTitle = document.getElementById("todo-title");

  // 서버에서 할일 목록을 불러오는 함수
  const loadTodos = async () => {
    const response = await fetch("/api/todos");
    const todos = await response.json();

    // 할일 목록을 화면에 출력
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.title;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제";
      deleteButton.onclick = async () => {
        await fetch(`/api/todos/${todo._id}`, {
          method: "DELETE",
        });
        loadTodos();
      };
      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  };

  // 할일 추가하는 함수
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = todoTitle.value;

    if (title) {
      await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      todoTitle.value = "";
      loadTodos(); // 추가 후 목록 다시 불러오기
    }
  });

  // 처음 로드 시 할일 목록 불러오기
  loadTodos();
});
