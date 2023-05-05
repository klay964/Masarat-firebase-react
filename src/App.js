import { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
// import useFetch from './hooks/useFetch';

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // const { data, loading, error } = useFetch('https://fakestoreapi/customer');

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

  async function updateTask(id) {
    try {
      await updateDoc(doc(db, 'tasks', id), {
        name: 'Salam',
        phone: '0783832332',
      });
    } catch (err) {
      alert(err);
    }
  }
  async function deleteTask(id) {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (err) {
      alert(err);
    }
  }

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
          <h1 style={{ textAlign: 'center' }}>{task.name}</h1>
          <h1 style={{ textAlign: 'center' }}>{task.phone}</h1>

          <button onClick={() => updateTask(task.id)}>Update</button>
          <button onClick={() => deleteTask(task.id)}>delete</button>
        </>
      ))}
    </>
  );
}

export default App;
