const initState = {
  working: false,
};

export default function PaperoReducer(state = initState, action) {
  switch (action.type) {
      case 'SENDWORK':
        return {...state, working: true};
      case 'SENDED':
        return {...state, working: false};
      case 'SENDFAILED':
        return {...state, working: false};
      default:
        return state;
  }
}