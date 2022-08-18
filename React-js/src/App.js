import React, { useState, useRef, useEffect} from 'react';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import classes from './components/UI/container/MyContainer.module.css';
import MyTextInput from './components/UI/text/MyTextInput';

function App() {

  const [messageList, setMessageList] = useState([]);
  const ref = useRef();
  
  function handleSubmit(event) {
    event.preventDefault();/* отключаем стандартную работу инпута*/
    const target = event.target;
    const author = target.author.value;/*создаем переменую,с событием что бы взять значение из импута*/
    const text = target.text.value;/*создаем переменую,с событием что бы взять значение из импута*/

    
    setMessageList(prev => [...prev, {
      id: giveLastId(prev),
      author: author,
      text: text,
  }]);

  }

  function giveLastId(array) {
    return array.length ? array[array.length - 1].id + 1 : 0; 
    /* создаем функцию,если в массиве есть хотя бы один эелемент,если это правда мы берем последний эелемент и прибовляем к нему +1.Если елементов нет, то будет 0.*/
  }

  useEffect( () => {/*создаем эфект задержки сообщения от бота*/
    setTimeout( () => {
        botAnswer(messageList);
    }, 1500 );
  }, [messageList] );
  /*берем состояние эфекта,создаем,устанавнием ответ от бота через 1,5 сек, и в последней строчке добовляем зависимость,что бы робот писал сообщения только при изменениях*/

  function botAnswer() {/*создаем функцию для отправки сообщения от бота*/
    const lastAuthor = messageList[messageList.length - 1];
    /*создаем переменую,которая берет длину всего массива и достает самое последние*/ 
    if (lastAuthor && lastAuthor.author) {
    /*если в нашей переменой есть автор последнего сообщения, то выполняем следующие*/
        setMessageList(prev => [...prev, {
    /*берем наше состояние сохраняем все предыдущие значения, вовзращаем массив и добовляем в конец новый объект */
            id: giveLastId(prev),
    /*используем нашу функцию для определения id*/
            text: `Сообщение автора ${lastAuthor.author} отправлено`,
    /**пишем сообщение для бота,которое он отправляет */
        }]);
    }
}

  return (
    <div>
      <form 
        className ={classes.container}
        onSubmit={handleSubmit}
        >
        <MyInput
          id="name"
          label="Имя"
          name ="author"/*задаем имя равное созданой переменой,что бы наша переменая могла взять отсюда значение*/
          placeholder ="Имя"
          inputref={ref}/>
        <MyInput
          id="message"
          label="Сообщение"
          name ="text"/*задаем имя равное созданой переменой,что бы наша переменая могла взять отсюда значение*/
          placeholder ="Текст"
          inputref={ref} 
        />
        <MyButton type="submit"> Отправить </MyButton>
      </form>
      <MyTextInput messageList={messageList}/>
    </div>
  );
}

export default App;
