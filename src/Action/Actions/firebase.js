export const load = () => {
  return {
    type: 'LOAD',
  }
};

export const updateData = (new_data) => {
  return {
    type: 'UPDATEDATA',
    new_data: new_data
  }
};

export const updateTime = (new_time) => {
  return {
    type: 'UPDATETIME',
    new_time: new_time
  }
};



export const loaded = (data_list) => {
  return {
    type: 'LOADED',
    data_list: data_list
  }
};



