// Menunggu sampai semua elemen di DOM selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
    // Mendapatkan elemen form, input, dan daftar todo
    const todoForm = document.querySelector('form'); // Mengambil elemen form
    const todoInput = document.getElementById('todo-input'); // Mengambil elemen input dengan id
    const todoListUL = document.getElementById('todo-list'); // Mengambil elemen ul daftar todo

    // Mengambil daftar todo dari localStorage
    let allTodos = getTodos(); // Memuat todos yang tersimpan di localStorage
    updateTodoList(); // Memperbarui tampilan daftar todo

    // Menambahkan event listener untuk form submit
    todoForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Mencegah reload halaman saat submit
        addTodo(); // Menambahkan todo baru
    });

    // Fungsi untuk menambahkan todo baru
    function addTodo() {
        const todoText = todoInput.value.trim(); // Mengambil nilai input dan menghapus spasi ekstra
        if (todoText.length > 0) { // Memastikan input tidak kosong
            const todoObject = {
                text: todoText, // Teks todo
                completed: false // Status todo (belum selesai)
            };
            allTodos.push(todoObject); // Menambahkan todo ke array
            updateTodoList(); // Memperbarui tampilan daftar todo
            saveTodos(); // Menyimpan todo ke localStorage
            todoInput.value = ""; // Mengosongkan input setelah submit
        }
    }

    // Fungsi untuk memperbarui daftar todo di tampilan
    function updateTodoList() {
        todoListUL.innerHTML = ""; // Mengosongkan elemen ul sebelum menambahkan elemen baru
        allTodos.forEach((todo, todoIndex) => { // Iterasi melalui semua todo
            const todoItem = createTodoItem(todo, todoIndex); // Membuat elemen li untuk setiap todo
            todoListUL.append(todoItem); // Menambahkan elemen li ke ul
        });
    }

    // Fungsi untuk membuat elemen todo
    function createTodoItem(todo, todoIndex) {
        const todoId = "todo-" + todoIndex; // Membuat ID unik untuk checkbox
        const todoLI = document.createElement("li"); // Membuat elemen li
        todoLI.className = "todo"; // Menambahkan kelas CSS
        
        // Menambahkan HTML untuk elemen li
        todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
            <label for="${todoId}" class="custom-checkbox">
              <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
              </svg>
            </label>
            <label for="${todoId}" class="todo-txt">
                ${todo.text}
            </label>
            <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
        `;
        
        // Menambahkan event listener ke tombol hapus
        const deleteButton = todoLI.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            deleteTodoItem(todoIndex); // Menghapus todo berdasarkan index
        });

        // Menambahkan event listener ke checkbox
        const checkbox = todoLI.querySelector("input");
        checkbox.addEventListener("change", () => {
            allTodos[todoIndex].completed = checkbox.checked; // Mengubah status todo
            saveTodos(); // Menyimpan perubahan ke localStorage
        });
        checkbox.checked = todo.completed; // Menampilkan status todo (checked/un-checked)

        return todoLI; // Mengembalikan elemen li
    }

    // Fungsi untuk menghapus todo berdasarkan index
    function deleteTodoItem(todoIndex) {
        allTodos = allTodos.filter((_, i) => i !== todoIndex); // Menghapus todo dari array
        saveTodos(); // Menyimpan perubahan ke localStorage
        updateTodoList(); // Memperbarui tampilan daftar todo
    }

    // Fungsi untuk menyimpan todos ke localStorage
    function saveTodos() {
        const todojson = JSON.stringify(allTodos); // Mengubah array ke JSON string
        localStorage.setItem("todos", todojson); // Menyimpan JSON string di localStorage
    }

    // Fungsi untuk mengambil todos dari localStorage
    function getTodos() {
        const todos = localStorage.getItem("todos") || "[]"; // Mengambil data atau default ke array kosong
        return JSON.parse(todos); // Mengubah JSON string menjadi array
    }
});
