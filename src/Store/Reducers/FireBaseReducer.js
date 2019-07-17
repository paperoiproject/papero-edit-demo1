const initState = {
    test: [],
    time: [],
};

export default function fireBaseReducer(state = initState, action) {
  switch (action.type) {
      case 'LOADED':
        return {
          ...state,
          test: action.data_list[0].datas.map((v) => {
            return{
              name: v.name,
              day: v.day.toDate(),
              tasks: v.tasks
            }
          }),
          time: action.data_list[0].time
       };
      default:
        return state;
  }
}