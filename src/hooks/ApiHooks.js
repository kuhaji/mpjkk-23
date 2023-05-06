import {useState, useEffect} from 'react';
import {baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const getMedia = async () => {
    try {
      const files = await doFetch(baseUrl + 'media');
      const filesWithThumbnail = await Promise.all(
        files.map(async (file) => {
          return await doFetch(baseUrl + 'media/' + file.file_id);
        })
      );
      setMediaArray(filesWithThumbnail);
    } catch (error) {
      console.error('getMedia', error.message);
    }
  };

  useEffect(() => {
    try {
      getMedia();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return {mediaArray};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  const getUser = async (id) => {
    return await doFetch(baseUrl + `users/${id}`);
  };

  return {postUser, getUser};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await doFetch(baseUrl + 'login', options);
  };
  return {postLogin};
};

const useLogin = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postLogin = async (inputs) => {
    setIsLoading(true);
    try {
      const result = await useAuthentication().postLogin(inputs);
      setData(result);
      setError(null);
    } catch (error) {
      setError(error);
      setData(null);
    }
    setIsLoading(false);
  };

  return {data, isLoading, error, postLogin};
};

export {useMedia, useUser, useAuthentication, useLogin};
