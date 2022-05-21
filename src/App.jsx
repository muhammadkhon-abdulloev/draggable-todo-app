import React, { useState, useEffect } from 'react';
import {v4 as uuid} from 'uuid';
import {randomColor as rc}  from 'randomcolor';
import Draggable from 'react-draggable';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

const App = () => {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = (e) => {
    e.preventDefault()
    if (item.trim() !== '') {
      const newItem = {
        id: uuid(),
        item,
        color: rc({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert('Enter something!')
      setItem('')
    }
  }

  const deleteItem = (id) => {
    
    setItems(items.filter((item) => item.id !== id))
  }

  const updatePosition = (data, index) => {
    let newArr = [...items]
    newArr[index].defaultPos = {x: data.x, y: data.y}
    setItems(newArr)
  }

  return (
    <div className="App">
      <div className='logo'>
      <svg width="134" height="28" viewBox="0 0 134 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.7617 28H7.05078V3.58594H0.996094V0.0214844H16.5234V3.58594H10.7617V28ZM28.2422 24.1914H36.1035V3.53711H28.2422V24.1914ZM24.5312 28V0.0214844H40.0098V28H24.5312ZM51.7285 24.1914H58.125L59.1016 23.0195V5.00195L58.125 3.53711H51.7285V24.1914ZM48.0176 28V0.0214844H59.0039L63.4961 6.51562V21.9941L58.5156 28H48.0176ZM75.2148 24.1914H83.0762V3.53711H75.2148V24.1914ZM71.5039 28V0.0214844H86.9824V28H71.5039ZM98.7012 24.1914H106.562V3.53711H98.7012V24.1914ZM94.9902 28V0.0214844H110.469V28H94.9902ZM122.188 24.1914H130.049V3.53711H122.188V24.1914ZM118.477 28V0.0214844H133.955V28H118.477Z" fill="#F5F5F5"/>
      </svg>
      </div>
      <div className="wrapper">
        <form>
        <MyInput 
          type="text"
          placeholder='Enter task here...'
          onChange={(e) => setItem(e.target.value)}
          value={item}      
          className="myInput"
          />
        <MyButton 
          onClick={newItem}
          className="myBtn"
          >
            Add
          </MyButton>
        </form>        
      </div>

      {
        items.map((item, index) =>{
          return (
            <Draggable
            key={index}
            defaultPosition={item.defaultPos}
            onStop={(e_, data) => {
              updatePosition(data, index)
            }}
            >
              <div className='todo__item' style={{backgroundColor: item.color}}>
                <p>{item.item}</p>
                <div className='btnBlock'>
                  <label 
                    className='delete' 
                    onClick={() => deleteItem(item.id)}
                  >x</label>
                </div>
              </div>
            </Draggable>
          )
        })
      }
    </div>
  );
}

export default App;
