import api from '../apis/axios';

export const getAllDocuments = async (url: string, filter?: object) => {
  try {
    const response = await api({
      method: 'get',
      url: `${url}`,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        ...filter,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDocumentById = async (url: string, id: string) => {
  try {
    const response = await api({
      method: 'get',
      url: `${url}/${id}`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDocument = async (url: string, data: object) => {
  try {
    const response = await api({
      method: 'post',
      url: `${url}`,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDocumentById = async (
  url: string,
  id: string,
  data: object
) => {
  try {
    const response = await api({
      method: 'put',
      url: `${url}/${id}`,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDocumentById = async (url: string, id: string) => {
  try {
    const response = await api({
      method: 'delete',
      url: `${url}/${id}`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
