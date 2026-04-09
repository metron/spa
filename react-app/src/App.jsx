import {useState, useEffect} from 'react'
import './App.css'

function App() {
    // const [tasks, setTasks] = useState([
    //     {title: 'Задача 1', stack: 'React', desc: 'Описание Задачи 1'},
    //     {title: 'Задача 2', stack: 'Python', desc: 'Описание Задачи 2'},
    //     {title: 'Задача 3', stack: 'Go', desc: 'Описание Задачи 3'},
    //     {title: 'Задача 4', stack: 'C++', desc: 'Описание Задачи 4'},
    // ]);

    const [tasks, setTasks] = useState(() => {
        // Пытаемся достать данные из LocalStorage
        const savedTasks = localStorage.getItem("app_tasks");
        // Если данные есть, превращаем строку обратно в массив, иначе — пустой массив
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [formData, setFormData] = useState({title: '', stack: '', desc: ''});
    const [filter, setFilter] = useState('');
    const [isDark, setIsDark] = useState(false);

    // Фильтруем задачи по названию или стеку
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(filter.toLowerCase()) || task.stack.toLowerCase().includes(filter.toLowerCase()));

    // Следим за изменением темы и меняем класс у тега html
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        // Превращаем массив в строку и сохраняем под ключом 'my_app_tasks'
        localStorage.setItem("app_tasks", JSON.stringify(tasks));
    }, [tasks]); // Запускать только при изменении tasks

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;
        setTasks([...tasks, {...formData, id: Date.now()}]);
        setFormData({title: '', stack: '', desc: ''}); // Очистка формы
    };

    // Удаление одной задачи по ID
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Полная очистка списка
    const clearAll = () => {
        if (window.confirm("Вы уверены, что хотите удалить все задачи?")) {
            setTasks([]);
        }
    };

    return (<div className="container">
        {/* Левая колонка: Форма */}
        <aside className="sidebar">
            <h2>Новая задача</h2>
            <form onSubmit={addTask}>
                <input
                    name="title"
                    placeholder="Название"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    name="stack"
                    placeholder="Стек (напр. React, Node)"
                    value={formData.stack}
                    onChange={handleChange}
                />
                <textarea
                    name="desc"
                    placeholder="Описание"
                    value={formData.desc}
                    onChange={handleChange}
                />
                <button type="submit">Добавить</button>
            </form>
        </aside>

        {/* Правая колонка: Список */}
        <main className="content">
            <div className="content-header">
                <h2>Список задач</h2>
                <button onClick={() => setIsDark(!isDark)} className="theme-toggle">
                    {isDark ? '☀️' : '🌙'} {isDark ? 'Светлая' : 'Темная'} тема
                </button>
                {tasks.length > 0 && (
                    <button onClick={clearAll} className="clear-btn">Очистить всё</button>
                )}
            </div>
            <div className="filter-box">
                <input
                    type="text"
                    placeholder="Поиск по названию или стеку..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div className="grid">
                {filteredTasks.map(task => (<div key={task.id} className="card">
                    <div className="card-header">
                        <h3>{task.title}</h3>
                        <button onClick={() => deleteTask(task.id)} className="delete-btn">×</button>
                    </div>
                    <span className="badge">{task.stack}</span>
                    <p>{task.desc}</p>
                </div>))}
                {tasks.length === 0 && <p>Задач пока нет. Добавьте первую!</p>}
                {tasks.length !== 0 && filteredTasks.length === 0 && <p>Задач не найдено</p>}
            </div>
        </main>
    </div>);
}

export default App
