import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, onSnapshot, addDoc } from 'firebase/firestore';
function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'tasks'), {
        name,
        phone,
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'tasks'));
    onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot);
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);
  console.log(tasks);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>phone</label>
        <input
          type='text'
          name='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      {tasks.map((task) => (
        <>
          <h1 style={{ textAlign: 'center' }}>
            {task.name}//{task.id}
          </h1>
        </>
      ))}
    </>
  );
}

export default App;
