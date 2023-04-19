import React from 'react';
import './App.css';
import {useState} from 'react';
import {mediaArray} from './components/mediaArray';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const showModal = (image) => {
    setModalVisible(true);
    setModalImage(image);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalImage('');
  };

  return (
    <div className="App">
      <h1>Media Gallery</h1>
      <table>
        <tbody>
          {mediaArray.map((media, index) => (
            <tr key={index}>
              <td>
                <img src={media.thumbnails.w160} alt={media.title} />
              </td>
              <td>
                <h3>{media.title}</h3>
                <p>{media.description}</p>
              </td>
              <td>
                <a href="#" onClick={() => showModal(media.filename)}>
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalVisible && (
        <div className="modal">
          <span className="close" onClick={() => hideModal()}>
            &times;
          </span>
          <img src={modalImage} alt="Modal" />
        </div>
      )}
    </div>
  );
}

export default App;
