import React from 'react';
import classes from './MyTextInput.module.css';

const MyTextInput = ({messageList}) => {
  return (
    <div className={classes.message}>
      {messageList.map( message =>   /*Мы берем наш инпут messageList и рендрим его через свойство map*/
      /*создаем div для нашего текста и задаем ключ что бы react не ругался*/
        <div key={message.id}>
          { message.author && <p><span>Автор:</span> {message.author}</p>}
          <p>{ message.author && <span>Текст:</span>} {message.text}</p>
        </div> )}
    </div>
    /*Описываем логику, если у нас есть последний автор,то ты создаем тег p в котором будет отображаться имя нашего автора,которое берется из нашего инпута,с текстом аналогично*/
  );
};

export default MyTextInput;