import { useState, useRef, useEffect } from 'react';
import AddPhoto from '../Buttons/AddPhoto';

const PhotoBox = () => {
  let photos;
  const inputFile = useRef(null);
  const [imgs, setImgs] = useState([]);
  const [urls, setUrls] = useState([]);

  const imgBox = {
    width: '100%',
    height: '150px',
    backgroundColor: 'white',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const imgStyle = {
    width: '95px',
    height: '90px',
    borderRadius: '5px',
    objectFit: 'cover'
  };

  const handleFileUload = e => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;
      const parts = filename.split('.');
      const fileType = parts[parts.length - 1];
      setImgs(files[0]);
      setUrls(urls => [...urls, URL.createObjectURL(e.target.files[0])]);
    }
  };

  const handleClick = () => {
    inputFile.current.click();
  };

  if (!urls.length) {
    photos = (
      <div style={imgBox} className='img-box' onClick={handleClick}>
        <AddPhoto />
      </div>
    );
  } else {
    let imgList = urls.map((url, i) => {
      return (
        <div key={i} style={{ marginRight: '5px' }}>
          <img src={url} alt={url} style={imgStyle} />
        </div>
      );
    });
    photos = (
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
        {imgList}
        <AddPhoto handleClick={handleClick} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h3>Photo Upload</h3>
        <p>Photos - {urls.length}/5 - You can add up to 5</p>
      </div>
      <input
        type='file'
        onChange={handleFileUload}
        ref={inputFile}
        style={{ display: 'none' }}
      />
      {photos}
    </div>
  );
};

export default PhotoBox;
